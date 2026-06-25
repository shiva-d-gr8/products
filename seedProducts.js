require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./model/Product");

const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Sports",
  "Furniture",
  "Toys",
  "Beauty",
  "Grocery"
];

const productNames = [
  "Laptop",
  "Smartphone",
  "Headphones",
  "Keyboard",
  "Mouse",
  "Monitor",
  "Novel",
  "Notebook",
  "Football",
  "Cricket Bat",
  "Chair",
  "Table",
  "Sofa",
  "Toy Car",
  "Shampoo",
  "Face Wash",
  "T-Shirt",
  "Jeans",
  "Rice Bag",
  "Coffee Mug"
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.DB);

    console.log("MongoDB Connected");

    // Remove old products
    await Product.deleteMany({});

    const totalProducts = 20000;
    const batchSize = 5000;

    for (let i = 0; i < totalProducts; i += batchSize) {
      const products = [];

      for (let j = 0; j < batchSize && i + j < totalProducts; j++) {
        const daysAgo = Math.floor(Math.random() * 365);

        const randomDate = new Date(
          Date.now() - daysAgo * 24 * 60 * 60 * 1000
        );

        products.push({
          name: `${
            productNames[
              Math.floor(Math.random() * productNames.length)
            ]
          } ${i + j + 1}`,

          category:
            categories[
              Math.floor(Math.random() * categories.length)
            ],

          price: Math.floor(Math.random() * 5000) + 100,

          created_at: randomDate,
          updated_at: randomDate,
        });
      }

      await Product.insertMany(products);

      console.log(
        `${Math.min(i + batchSize, totalProducts)} products inserted`
      );
    }

    console.log("200000 Products Inserted Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedProducts();