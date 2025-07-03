// index.js (Express backend entry)

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Load environment variables from .env file if any
require('dotenv').config();

// Enable CORS for all routes (adjust as needed)
app.use(cors());

// Serve static files from React app build directory
app.use(express.static(path.join(__dirname, '../NeoWs-frontend/build')));

// Import your router module
const neoRoutes = require('./routes/neo');

// Use relative path prefix for API routes - DO NOT use full URLs here
app.use('/api/neo', neoRoutes);

// For any other routes, serve the React frontend index.html (for SPA routing support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../NeoWs-frontend/build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`NeoWs-backend is running on port ${port}`);
});
