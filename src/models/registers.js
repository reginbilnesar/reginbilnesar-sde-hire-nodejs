const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { response } = require("express");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  profileImage: { type: String }, // Store the image path or URL
  fathername: { type: String, required: true },
  mothername: { type: String, required: true },
  phoneno: { type: Number, required: true },
  dob: { type: Date, required: true },
  pumarks: { type: Number, required: true },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//generating tokens
studentSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();

    return token;
  } catch (error) {
    res.send("the errr part" + error);
    console.log("the errr part" + error);
  }
};

//converting password into hash
studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmpassword = await bcrypt.hash(this.password, salt);
  }

  next();
});

//comparepassword

studentSchema.methods.comparePassword = function (plainText, callback) {
  return callback(null, bcrypt.compareSync(plainText, this.password));
};

//creating a collections
const Register = new mongoose.model("user", studentSchema);

module.exports = Register;
