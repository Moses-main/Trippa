const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3500;

const routes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const guideRoutes = require("./routes/guidesRoutes");
const activitySpotRoutes = require("./routes/activityRoute");
const restaurantRoutes = require("./routes/restaurantRoute");

require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Mounting route
app.use(cors());
app.use("/api", routes);
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/activities", activitySpotRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/guides", guideRoutes);

const MONGO_URI = process.env.MONGO_URI;
// const LOCAL_CONN = process.env.LOCAL_MONGO_URI;

// Database connection

mongoose.connect(MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const db = mongoose.connection;
if (db) console.log("Database connection successful");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define route for the root endpoint
app.get("/", (req, res) => {
  // Read the Markdown file
  fs.readFile(
    path.join(__dirname, "public", "index.html"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      // Respond with the Markdown content
      res.header("Content-Type", "text/markdown");
      res.send(data);
    }
  );
});

app.listen(PORT, () => console.log(`app running on http://localhost:${PORT}`));
