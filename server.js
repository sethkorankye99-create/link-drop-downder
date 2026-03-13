const express = require('express');
const ytDlp = require('yt-dlp-exec');

const app = express();

app.get('/api/download', async (req, res) => {

  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send("Please provide a URL in the address bar!");
  }

  try {
    const info = await ytDlp(videoUrl, { dumpSingleJson: true });

    res.json({
      title: info.title,
      download: info.url
    });

  } catch (error) {
    res.status(500).send("Failed to extract video");
  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});