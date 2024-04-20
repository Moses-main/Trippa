const fs = require("fs");
const path = require("path");

// Write the logic to return the
// data for the trips section
exports.allHotels = (req, res) => {
  // Read the json data
  fs.readFile(
    path.join(__dirname, "..", "excel_data", "Hotels.json"),
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
