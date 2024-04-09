// routes.js
const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

// CRUD endpoints for the hotel
router.get("/", restaurantController.getAllRestaurants);
router.post("/", restaurantController.createRestaurant);
router.get("/:id", restaurantController.getRestuarantById);
router.put("/:id", restaurantController.updateRestuarant);
router.delete("/:id", restaurantController.deleteRestuarant);

module.exports = router;
