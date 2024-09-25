"use strict";

var mongoose = require("mongoose");
var studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true // Removes leading/trailing whitespace
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    // Can be 'male', 'female', 'other' or adjust based on your needs
    required: true,
    "enum": ["male", "female", "other"] // Restrict allowed values (optional)
  },
  phoneno: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Ensures no duplicate emails
    trim: true,
    lowercase: true // Convert email to lowercase for consistency
  },
  address: {
    type: String,
    required: true,
    trim: true // Removes leading/trailing whitespace
  }
});
module.exports = mongoose.model("Student", studentSchema);