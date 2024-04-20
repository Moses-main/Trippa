// routes.js
const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
// const authMiddleware = require("../middlewares/authMiddleware");

// Authentication routes
router.get("/", restaurantController.allRestaurants);
// router.get("/:criteria", tripsController.getTrip);
module.exports = router;
