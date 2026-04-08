const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./api/auth");

console.log("Auth routes loaded:", typeof authRoutes);

const app = express();
const PORT = 3000;

const clientPath = path.join(__dirname, "..", "client");

// Connect database FIRST
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ API routes FIRST
app.use("/api/auth", authRoutes);

// ✅ Static files AFTER API routes
app.use(express.static(clientPath));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});


app.get("/debug", (req, res) => {
  res.send("Debug route works");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});