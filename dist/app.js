"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require("dotenv").config();
var express = require("express");
var app = express();
var path = require("path");
var hbs = require("hbs");
var Register = require("./models/registers");
var Student = require("./models/Studentregister");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var bcrypt = require("bcryptjs");
var auth = require("./middleware/auth");
var session = require("express-session");
var flash = require("express-flash");
var multer = require("multer");
var helpers = require("./components/hbsHelper");
var _require = require("module"),
  register = _require.register;
require("./db/conn");
var axios = require("axios");
var controller = require("./controller/controller");
var port = process.env.PORT || 3000;
var static_path = path.join(__dirname, "..", "public");
var template_path = path.join(__dirname, "..", "templates/views");
var partials_path = path.join(__dirname, "..", "templates/partials");
var js_path = path.join(__dirname, "..", "public", "js");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended: false
}));
app.use(express["static"](static_path));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"](js_path));
app.use(methodOverride("_method"));
// Middleware to set up sessions
app.use(session({
  key: "user_sid",
  secret: "mynameisreginimlearningcodingandiliketorap",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 6000000
  }
}));
app.use(function (req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("dashboard");
  }
  next();
});
var sessionChecker = function sessionChecker(req, res, next) {
  if (req.session.useremail && req.cookies.user_sid) {
    res.redirect("dashboard");
  } else {
    next();
  }
};
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
for (var helper in helpers) {
  hbs.registerHelper(helper, helpers[helper]);
}
app.use(flash());
app.get("^/$|/index(.hbs)?", sessionChecker, function (req, res) {
  res.render("index");
});
app.get("/register(.hbs)?", sessionChecker, function (req, res) {
  res.render("register", {
    messages: req.flash()
  });
});
app.get("/Studentregister(.hbs)?", function (req, res) {
  res.render("studentregister", {
    messages: req.flash()
  });
});
app.get("/login(.hbs)?", sessionChecker, function (req, res) {
  res.render("login", {
    messages: req.flash()
  });
});
app.get("/courses(.hbs)?", function (req, res) {
  res.render("courses");
});
app.get("/dashboard(.hbs)?", function (req, res) {
  //get request to the api users
  axios.get("http://localhost:3000/api/users").then(function (response) {
    if (req.session.useremail && req.cookies.user_sid) {
      /* console.log(response.data); */
      res.render("dashboard", {
        users: response.data
      });
    } else {
      req.flash("error", "You need to login first");
      res.redirect("/login");
    }
  })["catch"](function (err) {
    res.send(err);
  });
});
app.get("/newuser(.hbs)?", function (req, res) {
  res.render("newuser", {
    message: req.flash()
  });
});
app.get("/updateuser(.hbs)?", function (req, res) {
  axios.get("http://localhost:3000/api/users", {
    params: {
      id: req.query.id
    }
  }).then(function (userdata) {
    res.render("updateuser", {
      message: req.flash(),
      user: userdata.data
    });
  })["catch"](function (err) {
    res.send(err);
  });
});
app.get("/profile(.hbs)?", function (req, res) {
  axios.get("http://localhost:3000/api/Susers").then(function (response) {
    if (req.session.useremail && req.cookies.user_sid) {
      /* console.log(response.data); */
      res.render("profile", {
        Susers: response.data
      });
      console.log(response.data);
    } else {
      req.flash("error", "You need to login first");
      res.redirect("/login");
    }
  })["catch"](function (err) {
    res.send(err);
  });
});

//put
app.put("api/users/:id", controller.update);

//delete
app["delete"]("api/users/:id", controller["delete"]);
app.post("/delete/:id/confirm", controller.confirmDelete);

//upload images

var storage = multer.diskStorage({
  destination: "public/uploads/",
  // Define a directory to store uploaded images
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Generate unique filename suffix
    var fileExtension = file.originalname.split(".").pop(); // Extract file extension
    cb(null, uniqueSuffix + "." + fileExtension); // Concatenate unique suffix with original extension
  }
});
var upload = multer({
  storage: storage
});
//Student register

// Registration route
app.post("/Submit", upload.single("profileImage"), /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var existingUser, newStudent, savedStudent;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(req.body);

          // Data validation (optional, customize based on your requirements)
          if (!(!req.body.firstname || !req.body.lastname || !req.body.gender || !req.body.phoneno)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).send("Please fill in all required fields"));
        case 4:
          // Email validation (optional, consider using a library like email-validator)
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
            req.flash("error", "Invalid Email format");
          }

          // Check for existing email (assuming unique email constraint in schema)
          _context.next = 7;
          return Student.findOne({
            email: req.body.email
          });
        case 7:
          existingUser = _context.sent;
          if (existingUser) {
            req.flash("error", "Email already exists");
          }

          // Create new student object (replace with actual field names)
          newStudent = new Student({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            fathername: req.body.fathername,
            mothername: req.body.mothername,
            gender: req.body.gender,
            phoneno: req.body.phoneno,
            email: req.body.email,
            address: req.body.address
            // password: hashedPassword (if applicable),
          });
          _context.next = 12;
          return newStudent.save();
        case 12:
          savedStudent = _context.sent;
          req.flash("success", "Student registered successfully"); // Assuming flash message implementation
          res.status(201).render("index"); // Or redirect to a confirmation page
          _context.next = 22;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          req.flash("error", "Error registering student"); // Generic error message
          res.status(500).redirect("/studentregister"); // Redirect to registration page with error flash message
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//register
app.post("/register", upload.single("profileImage"), /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var newUser, password, confirmpassword, _newUser, registered;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.body);
          // Check if email already exists
          _context2.next = 3;
          return Register.findOne({
            email: req.body.email
          });
        case 3:
          newUser = _context2.sent;
          if (!newUser) {
            _context2.next = 10;
            break;
          }
          // If email exists, display flash message
          req.flash("error", "Email already exists");
          console.log("email already exists");
          res.redirect("/register");
          _context2.next = 29;
          break;
        case 10:
          _context2.prev = 10;
          password = req.body.password;
          confirmpassword = req.body.confirmpassword;
          if (!(password === confirmpassword)) {
            _context2.next = 22;
            break;
          }
          _newUser = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: password,
            confirmpassword: confirmpassword,
            gender: req.body.gender
          });
          _context2.next = 17;
          return _newUser.save();
        case 17:
          registered = _context2.sent;
          req.flash("success", "User registered successfully");
          res.status(201).render("index");
          _context2.next = 24;
          break;
        case 22:
          req.flash("errorPassword", "Passwords do not match");
          return _context2.abrupt("return", res.redirect("/register"));
        case 24:
          _context2.next = 29;
          break;
        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](10);
          res.status(400).send(_context2.t0);
        case 29:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[10, 26]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

//login check with session

app.post("/login(.hbs)?", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var email, password, useremail, isMatch;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          email = req.body.email;
          password = req.body.password;
          _context3.next = 5;
          return Register.findOne({
            email: email
          }).exec();
        case 5:
          useremail = _context3.sent;
          _context3.next = 8;
          return bcrypt.compare(password, useremail.password);
        case 8:
          isMatch = _context3.sent;
          if (!useremail) {
            res.redirect("login");
          }
          if (!isMatch) {
            res.render("login");
          } else {
            req.session.useremail = useremail;
            res.redirect("dashboard");
          }
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send("Invaild login details");
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.get("/logout(.hbs)?", function (req, res) {
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
app["delete"]("/api/users/:id", controller["delete"]);

//api for students
app.post("/api/users", controller.create);
app.get("/api/Susers", controller.finds);
app.put("/api/users/:id", controller.update);
app["delete"]("/api/users/:id", controller["delete"]);
app.listen(port, function () {
  console.log("server is running at port no ".concat(port, " "));
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