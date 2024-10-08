const express = require('express');
const path = require('path');

const app = express();
const port = 4000; // Frontend service port

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch all routes and redirect to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Frontend service is running on port ${port}`);
});
