const router = require("express").Router();
const Product = require("../model/Product");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;

    let query = {};

    if (category) {
      query.category = category;
    }

    // SAFE CURSOR PAGINATION
    if (req.query.cursorUpdatedAt && req.query.cursorId) {
      query.$or = [
        {
          updated_at: { $lt: new Date(req.query.cursorUpdatedAt) },
        },
        {
          updated_at: new Date(req.query.cursorUpdatedAt),
          _id: { $lt: new mongoose.Types.ObjectId(req.query.cursorId) },
        },
      ];
    }

    const products = await Product.find(query)
      .sort({ updated_at: -1, _id: -1 })
      .limit(limit);

    let nextCursor = null;

    if (products.length > 0) {
      const last = products[products.length - 1];

      nextCursor = {
        cursorUpdatedAt: last.updated_at,
        cursorId: last._id,
      };
    }

    res.json({
      success: true,
      count: products.length,
      nextCursor,
      products,
    });
  } catch (err) {
    console.log("ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;