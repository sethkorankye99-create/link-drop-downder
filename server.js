// server.js
const express = require("express");
const ytDlp = require("yt-dlp-exec");

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
    const info = await ytDlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true
    });

    // Extract useful formats
    const downloads = info.formats
      .filter(f => f.ext === "mp4" && f.url)
      .map(f => ({
        quality: f.qualityLabel || (f.height ? `${f.height}p` : "unknown"),
        mimeType: f.mimeType || "video/mp4",
        url: f.url
      }))
      .slice(0, 6); // limit results

    res.json({
      title: info.title,
      lengthSeconds: info.duration,
      author: info.uploader,
      formats: downloads
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
    const info = await ytDlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true
    });

    // Extract useful formats
    const downloads = info.formats
      .filter(f => f.ext === "mp4" && f.url)
      .map(f => ({
        quality: f.qualityLabel || (f.height ? `${f.height}p` : "unknown"),
        mimeType: f.mimeType || "video/mp4",
        url: f.url
      }))
      .slice(0, 6); // limit results

    res.json({
      title: info.title,
      lengthSeconds: info.duration,
      author: info.uploader,
      formats: downloads
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to extract video", details: err.message });
  }
});

// Render requires process.env.PORT
const PORT = process.env.PORT || 10000; // Render uses 10000 by default

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});