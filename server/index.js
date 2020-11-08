require('dotenv').config();
const express = require("express");
const apis = require('./routers/apis')
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors')

require('./services/db');

const app = express()
  .use(bodyParser.json())
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.resolve(__dirname, 'client/build')))
  .use('/api', apis)
  .get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'../client/build/index.html'));
});
  
// start express server on port 5000
app.listen( process.env.dev || 5000, () => {
  console.log("server started on port 5000");
});