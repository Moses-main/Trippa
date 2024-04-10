const fs = require("fs");
const path = require("path");
const Hotels = require("../models/Hotel");
const Restaurants = require("../models/Restaurant");
const ActivitiesSpot = require("../models/ActivitySpot");
const User = require("../models/User");
const tripData = require("../config/trips.json");
const bodyParser = require("body-parser");

// Write the logic to return the
// data for the trips section
exports.allTrips = (req, res) => {
  // Read the json data
  fs.readFile(
    path.join(__dirname, "..", "config", "trips.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Respond with the Markdown content
      res.header("Content-Type", "text/json");
      res.send(data);
    }
  );
};
