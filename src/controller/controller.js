const { text } = require("express");
const Register = require("../models/registers");
const Student = require("../models/Studentregister");
const session = require("express-session");

//new user
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty" });
  }

  // Check if password matches confirm password
  if (req.body.password !== req.body.confirmpassword) {
    req.flash("error", "Password does not match confirm password");
    return res.redirect("/newuser");
  }

  try {
    // Check if email already exists
    const existingUser = await Register.findOne({ email: req.body.email });
    if (existingUser) {
      req.flash("error", "Email already exists");
      return res.redirect("/newuser");
    }

    // Create a new user
    const newUser = new Register({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      gender: req.body.gender,
    });

    // Save user in the database
    const savedUser = await newUser.save();
    req.flash("success", "User added successfully");
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating a user",
    });
  }
};

//retrieve and return all users/ retrive and return a single user

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Register.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Not found user with id` + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: `Erroor retriving with id` + id });
      });
  } else {
    Register.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occured while retriving user information ",
        });
      });
  }
};
//retrieve and return all students/ retrive and return a single user

exports.finds = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Student.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Not found user with id` + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: `Erroor retriving with id` + id });
      });
  } else {
    Student.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occured while retriving user information ",
        });
      });
  }
};

//update

exports.update = async (req, res) => {
  try {
    await Register.findByIdAndUpdate(req.params.id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      gender: req.body.gender,
    });
    req.flash("success", "User value is updated.");
    await res.redirect(`/dashboard`);
    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await Register.findById(req.params.id);

    // Instead of immediately deleting, render a confirmation page
    res.render("deleteConfirmation", { user });
  } catch (error) {
    console.log(error);
    res.redirect("/dashboard");
  }
};

// Handle the delete confirmation
exports.confirmDelete = async (req, res) => {
  try {
    if (req.body.confirmation === "yes") {
      // If confirmed, proceed with deletion
      await Register.deleteOne({ _id: req.params.id });

      req.flash(
        "deleteMessage",
        `Successfully deleted ${req.body.firstname} ${req.body.lastname}`
      );
    } else {
      // If not confirmed, redirect back to dashboard
      req.flash("deleteMessage", "Deletion canceled");
      console.log("Deletion canceled");
    }

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/dashboard");
  }
};

//search

exports.search = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const student = await Register.find({
      $or: [
        { firstname: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { firstname: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      student,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
