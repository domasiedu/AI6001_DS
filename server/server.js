const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const gameRoutes = require("./api/games");


console.log("Auth routes loaded:", typeof authRoutes);

const app = express();
const PORT = process.env.PORT || 3000;

const clientPath = path.join(__dirname, "..", "client");

// Connect database FIRST
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ API routes FIRST
app.use("/api/auth", authRoutes);

// ✅ Log the game routes to ensure they are loaded
console.log("Game routes loaded:", typeof gameRoutes);
app.use("/api/games", gameRoutes);

// ✅ Static files AFTER API routes
app.use(express.static(clientPath, { index: false }));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(clientPath, "register.html"));
});

app.get("/play", (req, res) => {
  res.sendFile(path.join(clientPath, "play.html"));
});


app.get("/debug", (req, res) => {
  res.send("Debug route works");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
