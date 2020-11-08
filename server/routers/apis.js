var express = require('express');
const interactionController = require('../controllers/interactionController');
const userLibraryController = require('../controllers/userLibraryController');
const bookshelfController = require('../controllers/bookshelfController');

module.exports = express
.Router()
.get('/library/:bookshelf', bookshelfController.getBooks)
.post('/library/:bookshelf', bookshelfController.addBookToBookshelf)
.post('/request/:type', interactionController.requestFactory)
.get('/friends', interactionController.getFriends)
.get('/search/:query', userLibraryController.getBookResult);

