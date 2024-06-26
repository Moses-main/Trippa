// routes.js
const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelsController");

// CRUD endpoints for the hotel
router.get("/", hotelController.allHotels);

module.exports = router;
