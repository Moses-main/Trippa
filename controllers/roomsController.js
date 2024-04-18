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
exports.getAllRooms = (req, res) => {
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

// Write the logic to return data for a specific room
// exports.getRoom = (req, res) => {
//   // Read the json data
//   fs.readFile(
//     path.join(__dirname, "..", "config", "rooms.json"),
//     "utf8",
//     (err, data) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//         return;
//       }

//       // Parse the JSON data
//       const rooms = JSON.parse(data);

//       // Retrieve the criteria from the request
//       const { criteria } = req.params;

//       // Find the room based on the criteria
//       //   const room = rooms.find((room) => room.criteria === criteria);

//       if (!room) {
//         // If no room matches the criteria, return a 404 Not Found response
//         res.status(404).send("Room not found");
//         return;
//       }

//       // Respond with the room data
//       res.json(room);
//     }
//   );
// };
