const actSpot = require("../models/ActivitySpot");

// Fetch all activity spot
exports.getAllActivitySpot = async (req, res) => {
  try {
    const activitySpot = await actSpot.find();
    res.json(activitySpot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch single hotel by ID
exports.getActivitySpotById = async (req, res) => {
  const activitySpotId = req.params.id;
  try {
    const activitySpot = await actSpot.findById(activitySpot);
    if (!activitySpot) {
      return res.status(404).json({ message: "Activity Spot not found" });
    }
    res.json(activitySpot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new activitySpot
exports.createActivitySpot = async (req, res) => {
  const {
    name,
    address,
    description,
    googleMap,
    priceRange,
    picture,
    tourGuide,
  } = req.body;
  try {
    const newActivitySpot = new actSpot({
      name,
      address,
      description,
      googleMap,
      priceRange,
      picture,
      tourGuide,
    });
    await newActivitySpot.save();
    res.status(201).json(newActivitySpot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a hotel
exports.updateActivitySpot = async (req, res) => {
  const activitySpotId = req.params.id;
  const {
    name,
    address,
    description,
    googleMap,
    priceRange,
    picture,
    tourGuide,
  } = req.body;
  try {
    const activitySpot = await Restaurant.findById(activitySpotId);
    if (!activitySpot) {
      return res.status(404).json({ message: "ActivitySpot not found" });
    }
    (activitySpot.name = name),
      (activitySpot.address = address),
      (activitySpot.description = description),
      (activitySpot.googleMap = googleMap),
      (activitySpot.roomPrice = roomPrice),
      (activitySpot.priceRange = priceRange),
      (activitySpot.picture = picture),
      (activitySpot.tourGuide = tourGuide);

    await activitySpot.save();
    res.json(activitySpot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an activity spot
exports.deleteActivitySpot = async (req, res) => {
  const activitySpotId = req.params.id;
  try {
    const activitySpot = await Hotel.findById(activitySpotId);
    if (!activitySpot) {
      return res.status(404).json({ message: "ActivitySpot not found" });
    }
    await activitySpot.remove();
    res.json({ message: "ActivitySpot deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
