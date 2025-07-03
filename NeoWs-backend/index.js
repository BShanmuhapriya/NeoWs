// index.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const neoRoutes = require('./routes/neo');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../NeoWs-frontend/build')));

app.use('/api/neo', neoRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../NeoWs-frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
