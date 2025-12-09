// backend/index.js

const express = require("express");
const cors = require("cors");

const app = express();

// ===== CORS Setup =====
const allowedOrigins = [
  "https://retail-management-system-steel.vercel.app", // <-- your frontend LIVE URL
  "http://localhost:3000" // local development
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// ===== Test Route =====
app.get("/", (req, res) => {
  res.json({ message: "Backend is running on Render!" });
});

// ===== Dummy Sales Data =====
// Replace this with database data later
const salesData = [
  {
    id: 1,
    transactionDate: "2024-11-01",
    product: "Shoes",
    gender: "Male",
    category: "Footwear",
    amount: 200
  },
  {
    id: 2,
    transactionDate: "2024-11-02",
    product: "Bag",
    gender: "Female",
    category: "Accessories",
    amount: 120
  },
  {
    id: 3,
    transactionDate: "2024-11-03",
    product: "T-shirt",
    gender: "Male",
    category: "Clothing",
    amount: 40
  }
];

// ===== /sales API =====
// Works with pagination & filters
app.get("/sales", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Here you can add filter logic using req.query.search, gender, category etc.
  let filteredData = [...salesData];

  // Pagination
  const start = (page - 1) * limit;
  const end = page * limit;
  const paginatedData = filteredData.slice(start, end);

  // Response format expected by frontend
  res.json({
    data: paginatedData,
    totalPages: Math.ceil(filteredData.length / limit),
    totalItems: filteredData.length,
  });
});

// ===== Server Startup =====
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
