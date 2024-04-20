const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Add additional fields as needed`
  name: { type: String, required: true },
  picture: { type: String },
  recentTrips: { type: String },
  bio: { type: String, },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
