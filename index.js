require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

const urls = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  const shorturl = urls.length + 1;
  urls[shorturl] = url;
  res.json({ original_url: url, short_url: shorturl });
});

app.get('/api/shorturl/:shorturl', function(req, res) {
  const shorturl = req.params.shorturl;
  const url = urls[shorturl];
  res.redirect(url);
});
