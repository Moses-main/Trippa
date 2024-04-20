// routes.js
const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");

// CRUD endpoints for the hotel
router.get("/", activityController.allActivities);

module.exports = router;
