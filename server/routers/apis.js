var express = require('express');
const interactionController = require('../controllers/interactionController');
const bookshelfController = require('../controllers/bookshelfController');

module.exports = express
.Router()
.get('/library/:bookshelf', bookshelfController.getBooks)
.post('/library/:bookshelf', bookshelfController.addBookToBookshelf)
.get('/friends', interactionController.getFriends);