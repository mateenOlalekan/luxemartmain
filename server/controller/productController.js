// controllers/productController.js
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product.js");

// @desc Create product (admin)
// @route POST /api/products
// @access Private/Admin
 const createProduct = asyncHandler(async (req, res) => {
  const { name, category, brand, price, description, countInStock } = req.body;
  const product = await Product.create({ name, category, brand, price, description, countInStock });
  res.status(201).json(product);
});

// @desc Get products (all)
// @route GET /api/products
// @access Public
 const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json(products)
});

// @desc Search product by id/name/category/brand (query params)
// @route GET /api/products/search
// @access Public
 const searchProduct = asyncHandler(async (req, res) => {
  const { id, name, category, brand } = req.query;

  if (id) {
    const p = await Product.findById(id);
    return res.json(p ? [p] : []);
  }

  // build regex queries for partial & case-insensitive matches
  const filters = {};
  if (name) filters.name = { $regex: name, $options: "i" };
  if (category) filters.category = { $regex: category, $options: "i" };
  if (brand) filters.brand = { $regex: brand, $options: "i" };

  const products = await Product.find(filters);
  res.json(products);
});

// @desc Update product (admin)
// @route PUT /api/products/:id
// @access Private/Admin
 const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updates = req.body;
  Object.assign(product, updates);
  const updated = await product.save();
  res.json(updated);
});

// @desc Delete product (admin)
// @route DELETE /api/products/:id
// @access Private/Admin
 const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await product.remove();
  res.json({ message: "Product removed" });
});

module.exports ={
  createProduct,
  getProducts,
  searchProduct,
  updateProduct,
  deleteProduct
}