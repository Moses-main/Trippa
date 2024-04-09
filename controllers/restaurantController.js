const Restaurant = require("../models/Restaurant");

// Fetch all hotesl
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurant = await Restaurant.find();
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch single hotel by ID
exports.getRestuarantById = async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const restaurant = await Restaurant.findById(restaurant);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new hotel
exports.createRestaurant = async (req, res) => {
  const {
    name,
    address,
    description,
    googleMap,
    dishes,
    restaurantType,
    priceRange,
    pictures,
  } = req.body;
  try {
    const newRestaurant = new Restaurant({
      name,
      address,
      description,
      googleMap,
      dishes,
      restaurantType,
      priceRange,
      pictures,
    });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a hotel
exports.updateRestuarant = async (req, res) => {
  const restaurantId = req.params.id;
  const {
    name,
    address,
    description,
    googleMap,
    dishes,
    restaurantType,
    priceRange,
    pictures,
  } = req.body;
  try {
    const restuarant = await Restaurant.findById(restaurantId);
    if (!restuarant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    (restuarant.name = name),
      (restuarant.address = address),
      (restuarant.description = description),
      (restuarant.googleMap = googleMap),
      (restuarant.roomPrice = roomPrice),
      (restuarant.priceRange = priceRange),
      (restuarant.pictures = pictures),
      //   (restuarant.email = email);

      await restuarant.save();
    res.json(restuarant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a restuarant
exports.deleteRestuarant = async (req, res) => {
  const restuarantId = req.params.id;
  try {
    const restuarant = await Hotel.findById(restuarantId);
    if (!restuarant) {
      return res.status(404).json({ message: "Restuarant not found" });
    }
    await restuarant.deleteOne();
    res.json({ message: "Restuarant deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
