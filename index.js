const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const target = "ad.sdupdates.news";

app.get('/', async (req, res) => {
  const ytUrl = req.query.url;
  if (!ytUrl) return res.json({error: "Add ?url=YouTube_Link"});

  const proxy = https://${target}/yt-dlp${new URL(ytUrl).pathname}${req.url.split('?')[1] ? '?' + req.url.split('?')[1] : ''};

  try {
    const response = await fetch(proxy);
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = {raw: text}; }
    res.json(data);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

app.listen(PORT, () => console.log(Running on port ${PORT}));
