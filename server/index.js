require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const apis = require('./routers/apis');
const usersRouter = require('./routers/users');

require('./services/db');


const app = express()
  .use(bodyParser.json())
  .use(cookieParser())
  .use(cors({
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.resolve(__dirname, 'client/build')))
  // .use(cookieParser())
  .use('/api', apis)
  .use('/api/users', usersRouter)
  .get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });

// start express server on port 5000
app.listen(process.env.dev || 5000, () => {
  console.log("server started on port 5000");
});