// routes/userRoutes.js
const express = require("express");
const router = express.Router();


const { registerUser, loginUser, getUserProfile } =require("../controller/userController.js");
const { protect } = require("../middleware/authMiddleware.js");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;

