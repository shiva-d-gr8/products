const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Database connection error:", err.message);
  }
};

module.exports = dbConnect;