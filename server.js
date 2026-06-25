require("dotenv").config();
const express = require("express");
const cors = require("cors");

const dbConnect = require("./dbConnect");
const productRoutes = require("./routes/products");

const app = express();

app.use(express.json());
app.use(cors());

dbConnect();

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});