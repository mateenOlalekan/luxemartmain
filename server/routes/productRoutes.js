// routes/productRoutes.js
const express = require("express");
const {
  createProduct,
  getProducts,
  searchProduct,
  updateProduct,
  deleteProduct
} = require("../controller/productController.js");
const { protect, admin } =require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", getProducts);
router.get("/search", searchProduct);

// admin-protected routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;

