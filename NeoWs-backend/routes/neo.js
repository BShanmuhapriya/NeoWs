// routes/neo.js
const express = require('express');
const router = express.Router();
const { getNeoFeed, getNeoLookup } = require('../services/nasaService');

router.get('/feed', async (req, res) => {
  const { start, end } = req.query;
  try {
    const data = await getNeoFeed(start, end);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/lookup/:asteroid_id', async (req, res) => {
  const { asteroid_id } = req.params;  // Use req.params for route parameters!
  try {
    const data = await getNeoLookup(asteroid_id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
