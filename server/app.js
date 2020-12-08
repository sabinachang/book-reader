require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const apis = require('./routers/apis');
const usersRouter = require('./routers/users');

const app = express()
    .use(bodyParser.json())
    .use(cookieParser())
    .use(cors({
        origin: [
            "http://localhost:3000",
            // "http://localhost:3000/socket.io",
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

module.exports = app