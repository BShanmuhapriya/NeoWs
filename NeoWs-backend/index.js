const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

require('dotenv').config();

app.use(cors());

// Serve static files from the React frontend build folder
app.use(express.static(path.join(__dirname, 'path-to-frontend-build-folder')));

// For all GET requests, send back React's index.html file.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'path-to-frontend-build-folder', 'index.html'));
});

// Import router
const neoRoutes = require('./routes/neo');
app.use('/api/neo', neoRoutes);

app.listen(port, () => {
  console.log(`NeoWs-backend is running on port ${port}`);
});
