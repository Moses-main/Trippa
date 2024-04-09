// routes.js
const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

// CRUD endpoints for the hotel
router.get("/", hotelController.getAllHotels);
router.post("/", hotelController.createHotel);
router.get("/:id", hotelController.getHotelById);
router.put("/:id", hotelController.updateHotel);
router.delete("/:id", hotelController.deleteHotel);

module.exports = router;
