const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const cors = require('cors');

require('dotenv').config();

app.use(cors());

// Serve static files from the React frontend build folder
app.use(express.static(path.join(__dirname, '../NeoWs-frontend/build')));

// API routes
const neoRoutes = require('./routes/neo');
app.use('/api/neo', neoRoutes);

// For any other route, serve the React index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../NeoWs-frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`NeoWs-backend is running on port ${port}`);
});
