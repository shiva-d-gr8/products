require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });