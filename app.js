const express = require("express");
const app = express();

const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.send("Welcome to Trippa");
});

app.listen(PORT, () => console.log(`app running on http://localhost:${PORT}`));
