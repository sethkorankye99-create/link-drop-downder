// server.js
const express = require("express");
const ytdl = require("ytdl-core");

const app = express();
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Video extraction API is running!");
});

// POST endpoint
app.post("/extract", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    const info = await ytdl.getInfo(url);
    res.json({
      title: info.videoDetails.title,
      lengthSeconds: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
      formats: info.formats.map(f => ({
        quality: f.qualityLabel,
        mimeType: f.mimeType,
        url: f.url
      }))
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to extract video", details: err.message });
  }
});

// GET endpoint for browser testing
// Example: https://your-app.onrender.com/extract?url=https://youtu.be/abc123
app.get("/extract", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    const info = await ytdl.getInfo(url);
    res.json({
      title: info.videoDetails.title,
      lengthSeconds: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
      formats: info.formats.map(f => ({
        quality: f.qualityLabel,
        mimeType: f.mimeType,
        url: f.url
      }))
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to extract video", details: err.message });
  }
});

// Render requires process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});