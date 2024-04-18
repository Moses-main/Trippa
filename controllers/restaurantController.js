const fs = require("fs");
const path = require("path");

// Write the logic to return the
// data for the trips section
exports.allRestaurants = (req, res) => {
  // Read the json data
  fs.readFile(
    path.join(__dirname, "..", "excel_data", "RESTURANTS.json"),
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

// // Write the logic to return data for a specific room
// exports.getTrip = (req, res) => {
//   // Read the json data
//   fs.readFile(
//     path.join(__dirname, "..", "config", "trips.json"),
//     "utf8",
//     (err, data) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//         return;
//       }

//       // Parse the JSON data
//       const trips = JSON.parse(data);

//       // Retrieve the criteria from the request
//       const { criteria } = req.params;

//       // Find the room based on the criteria
//       const trip = trips.find((trip) => trip.criteria === criteria);

//       if (!trip) {
//         // If no room matches the criteria, return a 404 Not Found response
//         res.status(404).send("Trip not found");
//         return;
//       }

//       // Respond with the room data
//       res.json(trip);
//     }
//   );
// };
