// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jobRoutes = require("./routes/jobRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser for JSON

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("API for Company Profile is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
