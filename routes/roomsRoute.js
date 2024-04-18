// routes.js
const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/roomsController");
// const authMiddleware = require("../middlewares/authMiddleware");

// Authentication routes
router.get("/", roomsController.getAllRooms);
// router.get("/:criteria", roomsController.getRoom);

module.exports = router;
