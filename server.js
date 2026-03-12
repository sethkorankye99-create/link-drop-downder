const express = require('express');
const ytDlp = require('yt-dlp-exec');
const app = express();


app.get('/api/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).send("Please provide a URL in the address bar!");

    try {
        console.log(`🎬 Fetching video from: ${videoUrl}`);

        const output = await ytDlp(videoUrl, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
        });

        // This magic line redirects your browser straight to the video file
        if (output.url) {
            res.redirect(output.url);
        } else {
            res.status(404).send("Could not find a direct download link.");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching video. Make sure the link is public.");
    }
});


// Use the port Railway gives us, or default to 3000 for local testing
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});