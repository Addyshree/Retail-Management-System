// backend/index.js

const express = require("express");
const cors = require("cors");

const app = express();

// ===== CORS SETUP =====
const allowedOrigins = [
  "https://retail-management-system-steel.vercel.app", // your Vercel frontend
  "http://localhost:3000"                              // local dev (optional)
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Test route (for checking connection)
app.get("/", (req, res) => {
  res.json({ message: "Backend is running on Render!" });
});

// ===== SERVER START =====
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});
