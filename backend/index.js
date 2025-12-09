const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend is running on Render!");
});

// VERY IMPORTANT for Render
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});
