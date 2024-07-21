const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing whitespace
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  fathername: {
    type: String,
    required: true,
    trim: true,
  },
  mothername: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String, // Can be 'male', 'female', 'other' or adjust based on your needs
    required: true,
    enum: ["male", "female", "other"], // Restrict allowed values (optional)
  },
  phoneno: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    trim: true,
    lowercase: true, // Convert email to lowercase for consistency
  },
  address: {
    type: String,
    required: true,
    trim: true, // Removes leading/trailing whitespace
  },

  profileImage: {
    type: String, // Path to uploaded image file (optional)
  },
  pumarks: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  course: {
    type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
