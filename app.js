const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3500;

const routes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Mounting routes
app.use("/api", routes);
app.use("/api/users", userRoutes);

const MONGO_URI = process.env.MONGO_URI;
// Database connection
// mongoose.connect("mongodb://localhost:27017/Trippa", {
mongoose.connect(MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;
if (db) console.log("Database connection successful");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// app.get("/", (req, res) => {
//   res.send("Welcome to Trippa");
// });
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
