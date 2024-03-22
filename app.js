const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(expres.json());
app.use(express.static(path.join(__dirname, "public")));

// Database connection
// mongoose.connect("mongodb://localhost:27017/Trippa", {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// if (db) console.log("Database connection successful");
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Welcome to Trippa");
});

app.listen(PORT, () => console.log(`app running on http://localhost:${PORT}`));
