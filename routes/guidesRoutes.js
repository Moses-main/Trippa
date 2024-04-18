// routes.js
const express = require("express");
const router = express.Router();
const guideController = require("../controllers/guidesController");
// const authMiddleware = require("../middlewares/authMiddleware");

// Authentication routes
router.get("/", guideController.allGuides);
// router.get("/:criteria", tripsController.getTrip);
module.exports = router;
