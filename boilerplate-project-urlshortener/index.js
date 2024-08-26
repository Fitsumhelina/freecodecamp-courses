require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

// Basic Configuration
let urlDatabase = {}; // To store short_url and original_url pairs
let urlId = 1; // Unique identifier for URLs

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

// Serve the homepage
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// First API endpoint to test if everything is working
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// API endpoint to handle URL shortening
app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;

  // Basic URL validation using URL object
  try {
    const validUrl = new URL(url);
    const hostname = validUrl.hostname;

    dns.lookup(hostname, (err) => {
      if (err) {
        res.json({ error: 'invalid url' });
      } else {
        const shortUrl = urlId++;
        urlDatabase[shortUrl] = url;
        res.json({ original_url: url, short_url: shortUrl });
      }
    });
  } catch (e) {
    res.json({ error: 'invalid url' });
  }
});

// API endpoint to handle redirection from short URL to original URL
app.get('/api/shorturl/:short_url', function(req, res) {
  const shortUrl = req.params.short_url;
  const originalUrl = urlDatabase[shortUrl];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: 'No short URL found for the given input' });
  }
});

// Start the server
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
