// routes.js
const express = require("express");
const router = express.Router();
const activitySpotController = require("../controllers/activitySpotController");

// CRUD endpoints for the hotel
router.get("/", activitySpotController.getAllActivitySpot);
router.post("/", activitySpotController.createActivitySpot);
router.get("/:id", activitySpotController.getActivitySpotById);
router.put("/:id", activitySpotController.updateActivitySpot);
router.delete("/:id", activitySpotController.deleteActivitySpot);

module.exports = router;
