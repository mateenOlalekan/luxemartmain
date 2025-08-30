// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  brand: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  description: { type: String },
  countInStock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
