const express = require("express");
const router = express.Router();
const { login, logout, getUser } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/login", login);  // OAuth Login
router.post("/logout", logout); // Logout
router.get("/user", protect, getUser); // Get logged-in user

module.exports = router;
