const Hotel = require("../../models/Hotel");

// Fetch all hotesl
exports.getAllHotels = async (req, res) => {
  try {
    const hotel = await Hotel.find();
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch single hotel by ID
exports.getHotelById = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new hotel
exports.createHotel = async (req, res) => {
  const {
    name,
    address,
    description,
    googleMap,
    roomPrice,
    priceRange,
    pictures,
  } = req.body;
  try {
    const newHotel = new Hotel({
      name,
      address,
      description,
      googleMap,
      roomPrice,
      priceRange,
      pictures,
    });
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a hotel
exports.updateHotel = async (req, res) => {
  const hotelId = req.params.id;
  const {
    name,
    address,
    description,
    googleMap,
    roomPrice,
    priceRange,
    pictures,
  } = req.body;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    (hotel.name = name),
      (hotel.address = address),
      (hotel.description = description),
      (hotel.googleMap = googleMap),
      (hotel.roomPrice = roomPrice),
      (hotel.priceRange = priceRange),
      (hotel.pictures = pictures),
      //   (user.email = email);

      await hotel.save();
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a user
exports.deleteHotel = async (req, res) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    await hotel.deleteOne();
    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
