const express = require('express');
const interactionController = require('../controllers/interactionController');
const userLibraryController = require('../controllers/userLibraryController');
const bookshelfController = require('../controllers/bookshelfController');

module.exports = express
.Router()
.get('/library/:bookshelf', bookshelfController.getBooks)
.post('/library/:bookshelf', bookshelfController.addBookToBookshelf)
.post('/request/:type', interactionController.requestFactory)
.get('/friends', interactionController.getFriends)
.get('/friendship/all', interactionController.getCompleteFrienshipInfo)
.post('/friendship/invitation/:action', interactionController.handleInvitations)
.get('/search/:query', userLibraryController.getBookResult)
.get('/reviews/:bookIsbn', userLibraryController.getReview)
.post('/reviews/:bookIsbn', userLibraryController.createReview)
.get('/ratings/:bookIsbn', userLibraryController.getRating)
.post('/ratings/:bookIsbn', userLibraryController.createRating)
.get('/feedbacks/:bookIsbn', bookshelfController.getFeedbacks)
