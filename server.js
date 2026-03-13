const express = require('express');
const ytDlp = require('yt-dlp-exec');

const app = express();

app.get('/api/download', async (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).send("Please provide a URL in the address bar!");
    }

    try {
        // This is the updated part with the User-Agent
        const info = await ytDlp(videoUrl, {
            dumpSingleJson: true,
            noWarnings: true,
            noCheckCertificates: true,
            addHeader: [
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
            ]
        });

        res.json({
            title: info.title,
            download: info.url
        });

    } catch (error) {
        console.error(error); // This helps you see the real error in Render logs
        res.status(500).send("Failed to extract video: " + error.message);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});