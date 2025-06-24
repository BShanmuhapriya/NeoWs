const express = require('express')
const router = express.Router() 
const { getNeoFeed } = require('../services/nasaService')

router.get('/feed', async (req, res) => {
  const { start, end } = req.query;

  try {
    const data = await getNeoFeed(start, end);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;