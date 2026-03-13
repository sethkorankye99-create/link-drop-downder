// server.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());

// Root route (optional, just to avoid "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Video extraction API is running!");
});

// Example API endpoint: POST /extract
// You send { "url": "https://example.com/video" }
app.post("/extract", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    // TODO: Replace this with your actual extraction logic
    // For example, call a library or service that fetches video metadata
    const fakeResult = {
      originalUrl: url,
      title: "Sample Video",
      duration: "3:45",
      downloadLink: "https://cdn.example.com/video.mp4",
    };

    res.json(fakeResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to extract video" });
  }
});

// Render requires you to use process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});