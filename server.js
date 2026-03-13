// server.js
const express = require("express");
const app = express();

// Middleware for JSON
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Video extraction API is running!");
});

// POST endpoint (for tools like curl/Postman)
app.post("/extract", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  // Replace with your actual extraction logic
  res.json({
    method: "POST",
    originalUrl: url,
    message: "Video extracted successfully (fake data)",
  });
});

// NEW: GET endpoint so you can test in browser
// Example: https://your-app.onrender.com/extract?url=https://youtu.be/abc123
app.get("/extract", (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  // Replace with your actual extraction logic
  res.json({
    method: "GET",
    originalUrl: url,
    message: "Video extracted successfully (fake data)",
  });
});

// Render requires process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});