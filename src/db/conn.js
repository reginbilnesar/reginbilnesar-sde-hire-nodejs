const mongoose = require("mongoose");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/my_database";

mongoose
  .connect(uri, {
    /* useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,  */
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
