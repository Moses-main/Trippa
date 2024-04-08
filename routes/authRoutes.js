// routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Authentication routes
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);

// Authorization routes
router.get(
  "/profile",
  authMiddleware.authenticateToken,
  authController.profile
);

module.exports = router;
