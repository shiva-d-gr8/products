const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
    },

    created_at: {
      type: Date,
      required: true,
    },

    updated_at: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

// For newest-first pagination
productSchema.index({ updated_at: -1, _id: -1 });

// For category filtering + pagination
productSchema.index({ category: 1, updated_at: -1, _id: -1 });

module.exports = mongoose.model("Product", productSchema);