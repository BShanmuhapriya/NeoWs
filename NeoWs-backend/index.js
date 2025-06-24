const express = require('express')
const app = express() //creates an express application
const port = 5000

require('dotenv').config();

app.get('/', (req, res) => { //app.get => defines get point
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`NeoWs-backend is running on port ${port}`)
})

//import router
const neoRoutes = require('./routes/neo');
//use router
app.use('/api/neo', neoRoutes);
