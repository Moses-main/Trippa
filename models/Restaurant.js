const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  address: { type: "string", required: true },
  description: { type: "string", required: true },
  googleMap: { type: "string", required: true },
  dishes: { type: "string", required: true, default: ["continental", "local"] },
  restaurantType: {
    type: "string",
    required: true,
    default: ["roof top", "bar", "cafes"],
  },
  priceRange: { type: "number", required: true },
  pictures: { type: "array" },
});

Restuarant = mongoose.model("Restuarant", restaurantSchema);
module.exports = Restuarant;
