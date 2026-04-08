const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const clientPath = path.join(__dirname, "..", "client");

app.use(cors());
app.use(express.static(clientPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
