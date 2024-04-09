const mongoose = require("mongoose");

const activitySpotSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  address: { type: "string", required: true },
  description: { type: "string", required: true },
  googleMap: { type: "string", required: true },
  priceRange: { type: "string", required: true },
  picture: { type: "array" },
  tourGuide: { type: "string", required: true },
});

ActivitySpot = mongoose.model("ActivitySpot", activitySpotSchema);

module.exports = ActivitySpot;
