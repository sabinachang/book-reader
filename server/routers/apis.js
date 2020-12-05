const express = require('express');
const interactionController = require('../controllers/interactionController');
const userLibraryController = require('../controllers/userLibraryController');
const bookshelfController = require('../controllers/bookshelfController');
const privacyController = require('../controllers/privacyController');
const progressController = require('../controllers/progressController');
const wallController = require('../controllers/wallController');
const wallObserver = require('../middleware/wallObserver');

module.exports = express
    .Router()
    .get('/library/:bookshelf', bookshelfController.getBooks)
    .post('/library/:bookshelf', wallObserver.readRequest, bookshelfController.addBookToBookshelf)
    .put('/library/:bookshelf', bookshelfController.removeBookFromBookshelf)
    .post('/request/:type', interactionController.requestFactory)
    .get('/friends', interactionController.getFriends)
    .get('/friendship/all', interactionController.getCompleteFrienshipInfo)
    .get('/friendship/candidates', interactionController.getCandidates)
    .post('/friendship/invitation/:action', wallObserver.readRequest, interactionController.handleInvitations)
    .get('/search/:query', userLibraryController.getBookResult)
    .get('/progress/:isbn', progressController.getProgress)
    .put('/progress', progressController.updateProgress)
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
    .get('/privacy/:username/:privacyType', privacyController.getSettingsForPrivacyType)
    .post('/privacy/:username', privacyController.changeSettings);

