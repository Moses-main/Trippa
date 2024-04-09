const mongoose = require("mongoose");

const hotelSchema = new mongoose();

hotelSchema.Schema({
  name: { type: "string", required: true },
  address: { type: "string", required: true },
  description: { type: "string", required: true },
  googleMap: { type: "string" },
  roomPrice: { type: "number", required: true },
  priceRange: { type: "number", required: true },
  pictures: { type: "array", required: true },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
