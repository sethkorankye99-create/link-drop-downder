const express = require("express");
const ytDlp = require("yt-dlp-exec");

const app = express();
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Downloader API is running");
});

// Universal download endpoint
app.get("/api/download", async (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.status(400).json({
      error: "Please provide a video URL"
    });
  }

  try {

    const info = await ytDlp(url, {
      dumpSingleJson: true
    });

    // Get available formats
    const formats = info.formats
      .filter(f => f.ext === "mp4" && f.url)
      .map(f => ({
        quality: f.format_note || f.height + "p",
        url: f.url
      }));

    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      platform: info.extractor,
      downloads: formats.slice(0, 5)
    });

  } catch (error) {

    res.status(500).json({
      error: "Failed to extract video"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});