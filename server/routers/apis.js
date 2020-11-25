const express = require('express');
const interactionController = require('../controllers/interactionController');
const bookSearchController = require('../controllers/bookSearchController');
const bookshelfController = require('../controllers/bookshelfController');
const progressController = require('../controllers/progressController');

module.exports = express
.Router()
.get('/library/:bookshelf', bookshelfController.getBooks)
.post('/library/:bookshelf', bookshelfController.addBookToBookshelf)
.put('/library/:bookshelf', bookshelfController.removeBookFromBookshelf)
.post('/request/:type', interactionController.requestFactory)
.get('/friends', interactionController.getFriends)
//TODO combine with /friends
.get('/friendship/all', interactionController.getCompleteFrienshipInfo)
.post('/friendship/invitation/:action', interactionController.handleInvitations)
.get('/search/:query', bookSearchController.getBookResult)
.get('/progress', progressController.getProgress)
.put('/progress', progressController.updateProgress);

