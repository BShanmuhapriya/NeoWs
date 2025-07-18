const express = require('express');
const path = require('path');
const cors = require('cors');
const neoRoutes = require('./routes/neo');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Serve static files from the public directory (where Vite build is copied)
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.use('/api/neo', neoRoutes);

// Serve index.html for any other route (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
