// routes/neo.js (API routes)

const express = require('express');
const router = express.Router();
const { getNeoFeed, getNeoLookup } = require('../services/nasaService'); // Your service layer functions

// Route: GET /api/neo/feed?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get('/feed', async (req, res) => {
  const { start, end } = req.query;
  try {
    const data = await getNeoFeed(start, end);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: GET /api/neo/lookup/:asteroid_id
router.get('/lookup/:asteroid_id', async (req, res) => {
  const { asteroid_id } = req.params; // use req.params here, NOT req.query
  try {
    const data = await getNeoLookup(asteroid_id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
