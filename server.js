const express = require("express");
const ytDlp = require("yt-dlp-exec");

const app = express();

app.get("/", (req, res) => {
  res.send("Video extraction API running");
});

app.get("/extract", async (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.status(400).json({
      error: "Please provide a URL"
    });
  }

  try {

    const info = await ytDlp(url, {
      dumpSingleJson: true
    });

    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      video: info.url
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Failed to extract video"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});