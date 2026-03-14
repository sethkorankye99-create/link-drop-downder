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
app.listen(PORT,const express = require("express");
const cors = require("cors");
const ytDlp = require("yt-dlp-exec");

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Universal Video Downloader API is running");
});

// Main extraction endpoint
app.get("/api/download", async (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.status(400).json({
      error: "Please provide a video URL"
    });
  }

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
        quality: f.format_note || (f.height ? `${f.height}p` : "unknown"),
        url: f.url
      }))
      .slice(0, 6); // limit results

    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      platform: info.extractor,
      downloads: downloads
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to extract video"
    });

  }

});

// Port for cloud hosting
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
}); () => {
  console.log(`Server running on port ${PORT}`);
});