const express = require('express');
const interactionController = require('../controllers/interactionController');
const userLibraryController = require('../controllers/userLibraryController');
const bookshelfController = require('../controllers/bookshelfController');
const privacyController = require('../controllers/privacyController');
const progressController = require('../controllers/progressController');
const wallController = require('../controllers/wallController');
const wallObserver = require('../middleware/wallObserver');
const auth = require('../middleware/authentication');

module.exports = express
    .Router()
    .get('/library/:bookshelf', auth.authenticateUser, bookshelfController.getBooks)
    .post('/library/:bookshelf', auth.authenticateUser, wallObserver.readRequest, bookshelfController.addBookToBookshelf)
    .delete('/library/:bookshelf', auth.authenticateUser, bookshelfController.removeBookFromBookshelf)
    .post('/request/:type', auth.authenticateUser, interactionController.requestFactory)
    .get('/friends', auth.authenticateUser, interactionController.getFriends)
    .get('/friends/all', auth.authenticateUser, interactionController.getCompleteFrienshipInfo)
    .get('/friends/candidates', auth.authenticateUser, interactionController.getCandidates)
    .post('/friends/invitation/:action', auth.authenticateUser, wallObserver.readRequest, interactionController.handleInvitations)
    .get('/search/:query', auth.authenticateUser, userLibraryController.getBookResult)
    .get('/progress/:isbn', auth.authenticateUser, progressController.getProgress)
    .put('/progress', auth.authenticateUser, wallObserver.readRequest, progressController.updateProgress)
    .get('/reviews/:bookIsbn', auth.authenticateUser, userLibraryController.getReview)
    .post('/reviews/:bookIsbn', auth.authenticateUser, wallObserver.readRequest, userLibraryController.createReview)
    .get('/ratings/:bookIsbn', auth.authenticateUser, userLibraryController.getRating)
    .post('/ratings/:bookIsbn', auth.authenticateUser, wallObserver.readRequest, userLibraryController.createRating)
    .get('/feedbacks/:bookIsbn', auth.authenticateUser, bookshelfController.getFeedbacks)
    .get('/wall/public', auth.authenticateUser, wallController.getPublicWall)
    .get('/wall/:username', auth.authenticateUser, wallController.getPrivateWall)
    .post('/wall/:id/likes', auth.authenticateUser, wallController.toggleLikes)
    .post('/wall/:id/comments', auth.authenticateUser, wallController.addComment)
    .delete('/wall/comments/:id', auth.authenticateUser, wallController.deleteComment)
    .get('/wall/:id/comments', auth.authenticateUser, wallController.getComments)
    .get('/privacy/:username/:privacyType', auth.authenticateUser, privacyController.getSettingsForPrivacyType)
    .post('/privacy/:username', auth.authenticateUser, privacyController.changeSettings)
    // .get('/library/favorites', auth.authenticateUser, bookshelfController.getBooks)
    .post('/library/topfavorites', authenticateUser, bookshelfController.addTopFavoriteBooks);
