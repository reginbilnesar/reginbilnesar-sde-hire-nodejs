"use strict";

var mongoose = require("mongoose");
var uri = process.env.MONGO_URI || "mongodb://localhost:27017/my_database";
mongoose.connect(uri, {
  /* useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,  */
}).then(function () {
  console.log("MongoDB connected successfully");
})["catch"](function (err) {
  console.error("Error connecting to MongoDB:", err);
});