const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (like index.html and CSS)
app.use(express.static(__dirname));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission and auto-download
app.post('/send', (req, res) => {
    const message = req.body.message;
    const filePath = path.join(__dirname, 'message.txt');

    // Save the message
    fs.writeFileSync(filePath, message);

    // Trigger file download
    res.download(filePath, 'message.txt', (err) => {
        if (err) {
            console.error('Download error:', err);
            res.status(500).send('Could not download file');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
