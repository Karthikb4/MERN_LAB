const mongoose = require("mongoose");

const connectDB = () => {
  const mongoURI = "mongodb://localhost:27017/notes_db";
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
      process.exit(1);
    });
};

module.exports = connectDB;