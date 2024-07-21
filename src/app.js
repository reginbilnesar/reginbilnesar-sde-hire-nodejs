require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/registers");
const Student = require("./models/Studentregister");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
const session = require("express-session");
const flash = require("express-flash");
const multer = require("multer");
var helpers = require("./components/hbsHelper");

const { register } = require("module");
require("./db/conn");
const axios = require("axios");
const controller = require("./controller/controller");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "..", "public");
const template_path = path.join(__dirname, "..", "templates/views");
const partials_path = path.join(__dirname, "..", "templates/partials");
const js_path = path.join(__dirname, "..", "public", "js");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(js_path));
app.use(methodOverride("_method"));
// Middleware to set up sessions
app.use(
  session({
    key: "user_sid",
    secret: "mynameisreginimlearningcodingandiliketorap",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000000,
    },
  })
);

app.use((req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("dashboard");
  }
  next();
});

const sessionChecker = (req, res, next) => {
  if (req.session.useremail && req.cookies.user_sid) {
    res.redirect("dashboard");
  } else {
    next();
  }
};

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

for (let helper in helpers) {
  hbs.registerHelper(helper, helpers[helper]);
}

app.use(flash());

app.get("^/$|/index(.hbs)?", sessionChecker, (req, res) => {
  res.render("index");
});

app.get("/register(.hbs)?", sessionChecker, (req, res) => {
  res.render("register", { messages: req.flash() });
});

app.get("/Studentregister(.hbs)?", (req, res) => {
  res.render("studentregister", { messages: req.flash() });
});

app.get("/login(.hbs)?", sessionChecker, (req, res) => {
  res.render("login", { messages: req.flash() });
});

app.get("/courses(.hbs)?", (req, res) => {
  res.render("courses");
});

app.get("/dashboard(.hbs)?", (req, res) => {
  //get request to the api users
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      if (req.session.useremail && req.cookies.user_sid) {
        /* console.log(response.data); */
        res.render("dashboard", { users: response.data });
      } else {
        req.flash("error", "You need to login first");
        res.redirect("/login");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/newuser(.hbs)?", (req, res) => {
  res.render("newuser", { message: req.flash() });
});

app.get("/updateuser(.hbs)?", (req, res) => {
  axios
    .get("http://localhost:3000/api/users", {
      params: { id: req.query.id },
    })
    .then(function (userdata) {
      res.render(
        "updateuser",

        {
          message: req.flash(),
          user: userdata.data,
        }
      );
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/profile(.hbs)?", (req, res) => {
  axios
    .get("http://localhost:3000/api/Susers")
    .then(function (response) {
      if (req.session.useremail && req.cookies.user_sid) {
        /* console.log(response.data); */
        res.render("profile", { Susers: response.data });
        console.log(response.data);
      } else {
        req.flash("error", "You need to login first");
        res.redirect("/login");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

//put
app.put("api/users/:id", controller.update);

//delete
app.delete("api/users/:id", controller.delete);

app.post("/delete/:id/confirm", controller.confirmDelete);

//upload images

const storage = multer.diskStorage({
  destination: "public/uploads/", // Define a directory to store uploaded images
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Generate unique filename suffix
    const fileExtension = file.originalname.split(".").pop(); // Extract file extension
    cb(null, uniqueSuffix + "." + fileExtension); // Concatenate unique suffix with original extension
  },
});

const upload = multer({ storage: storage });
//Student register

// Registration route
app.post("/Submit", upload.single("profileImage"), async (req, res) => {
  try {
    console.log(req.body);

    // Data validation (optional, customize based on your requirements)
    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.fathername ||
      !req.body.mothername ||
      !req.body.gender ||
      !req.body.phoneno ||
      !req.body.email ||
      !req.body.course ||
      !req.body.pumarks ||
      !req.body.dob
    ) {
      return res.status(400).send("Please fill in all required fields");
    }

    // Email validation (optional, consider using a library like email-validator)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
      req.flash("error", "Invalid Email format");
    }

    // Check for existing email (assuming unique email constraint in schema)
    const existingUser = await Student.findOne({ email: req.body.email });
    if (existingUser) {
      req.flash("error", "Email already exists");
    }

    // Create new student object (replace with actual field names)
    const newStudent = new Student({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      fathername: req.body.fathername,
      mothername: req.body.mothername,
      gender: req.body.gender,
      phoneno: req.body.phoneno,
      email: req.body.email,
      address: req.body.address,
      // password: hashedPassword (if applicable),
      profileImage: req.file ? req.file.filename : null, // Store uploaded image path if exists
      pumarks: req.body.pumarks,
      course: req.body.course,
      dob: req.body.dob,
    });

    const savedStudent = await newStudent.save();

    req.flash("success", "Student registered successfully"); // Assuming flash message implementation
    res.status(201).render("index"); // Or redirect to a confirmation page
  } catch (error) {
    console.error(error);
    req.flash("error", "Error registering student"); // Generic error message
    res.status(500).redirect("/studentregister"); // Redirect to registration page with error flash message
  }
});

//register
app.post("/register", upload.single("profileImage"), async (req, res) => {
  console.log(req.body);
  // Check if email already exists
  let newUser = await Register.findOne({ email: req.body.email });
  if (newUser) {
    // If email exists, display flash message
    req.flash("error", "Email already exists");
    console.log("email already exists");

    res.redirect("/register");
  } else {
    try {
      const password = req.body.password;
      const confirmpassword = req.body.confirmpassword;
      if (password === confirmpassword) {
        const newUser = new Register({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: password,
          confirmpassword: confirmpassword,
          gender: req.body.gender,
          profileImage: req.file
            ? req.file.path
            : "/images/default-profile.png", // Store image path if uploaded
        });
        if (req.file) {
          console.log("Image uploaded successfully:", req.file);
        } else {
          console.log("No image uploaded");
        }

        const registered = await newUser.save();
        req.flash("success", "User registered successfully");
        res.status(201).render("index");
      } else {
        req.flash("errorPassword", "Passwords do not match");
        return res.redirect("/register");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
});

//login check with session

app.post("/login(.hbs)?", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Register.findOne({ email: email }).exec();
    const isMatch = await bcrypt.compare(password, useremail.password);

    if (!useremail) {
      res.redirect("login");
    }

    if (!isMatch) {
      res.render("login");
    } else {
      req.session.useremail = useremail;
      res.redirect("dashboard");
    }
  } catch (error) {
    res.status(400).send("Invaild login details");
  }
});

app.get("/logout(.hbs)?", (req, res) => {
  if (req.session.useremail && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("index");
    console.log("logut succesfully ");
  } else {
    res.redirect("login");
  }
});

//api
app.post("/api/users", controller.create);
app.get("/api/users", controller.find);
app.put("/api/users/:id", controller.update);
app.delete("/api/users/:id", controller.delete);

//api for students
app.post("/api/users", controller.create);
app.get("/api/Susers", controller.finds);
app.put("/api/users/:id", controller.update);
app.delete("/api/users/:id", controller.delete);

app.listen(port, () => {
  console.log(`server is running at port no ${port} `);
});
module.exports = upload.single("profileImage");

/* app.get("/logout", auth, async (req, res) => {
  try {
    console.log(req.user);

    req.user.tokens = req.user.tokens.filter((current_element) => {
      return current_element.token != req.token;
    });

    res.clearCookie("jwt");
    await req.user.save();
    console.log("logut succesfully ");

    await req.user.save();
    res.redirect("login");
  } catch (error) {
    res.status(500).send(error);
  }
}); */

//create a new user in our database
/* 
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (password === confirmpassword) {
      const registerStudent = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: password,
        confirmpassword: confirmpassword,
        gender: req.body.gender,
      });
      console.log("the success part" + registerStudent);

      const token = await registerStudent.generateAuthToken();
      console.log("the token part" + token);

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      });
      console.log("cookie");

      const registered = await registerStudent.save();
      res.status(201).render("index");
    } else {
      res.send("password is not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
}); */

//login check

/* app.post("/login(.hbs)?", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Register.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, useremail.password);

    const token = await useremail.generateAuthToken();
    console.log("the token part" + token);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true,
      //sercure:true
    });

    if (isMatch) {
      res.status(201).render("dashboard");
    } else {
      res.send("Invaild password details");
    }
  } catch (error) {
    res.status(400).send("Invaild login details");
  }
});
 */

//session logout

/* app.get("/logout(.hbs)?", (req, res) => {
  if (req.session.useremail && req.cookies.user_sid) {
    res.clearCookie("user_sid");
    res.redirect("index");
  } else {
    res.redirect("login");
  }
}); */
