// routes.js
const express = require("express");
const router = express.Router();
const tripsController = require("../controllers/tripsController");
// const authMiddleware = require("../middlewares/authMiddleware");

// Authentication routes
router.get("/", tripsController.allTrips);

module.exports = router;
