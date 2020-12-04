const express = require('express');
const interactionController = require('../controllers/interactionController');
const userLibraryController = require('../controllers/userLibraryController');
const bookshelfController = require('../controllers/bookshelfController');
const privacyController = require('../controllers/privacyController');
const wallController = require('../controllers/wallController');
const wallObserver = require('../middleware/wallObserver');

module.exports = express
    .Router()
    .get('/library/:bookshelf', bookshelfController.getBooks)
    .post('/library/:bookshelf', wallObserver.readRequest, bookshelfController.addBookToBookshelf)
    .post('/request/:type', interactionController.requestFactory)
    .get('/friends', interactionController.getFriends)
    .get('/friendship/all', interactionController.getCompleteFrienshipInfo)
    .post('/friendship/invitation/:action', wallObserver.readRequest, interactionController.handleInvitations)
    .get('/search/:query', userLibraryController.getBookResult)
    .get('/reviews/:bookIsbn', userLibraryController.getReview)
    .post('/reviews/:bookIsbn', wallObserver.readRequest, userLibraryController.createReview)
    .get('/ratings/:bookIsbn', userLibraryController.getRating)
    .post('/ratings/:bookIsbn', wallObserver.readRequest, userLibraryController.createRating)
    .get('/feedbacks/:bookIsbn', bookshelfController.getFeedbacks)
    .get('/wall/public', wallController.getPublicWall)
    .get('/wall/:username', wallController.getPrivateWall)
    .post('/wall/:id/likes', wallController.toggleLikes)
    .post('/wall/:id/comments', wallController.addComment)
    .delete('/wall/comments/:id', wallController.deleteComment)
    .get('/wall/:id/comments', wallController.getComments)
    .post('/users/:username', privacyController.changeSettings);

