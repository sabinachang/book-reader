const express = require('express');
const interactionController = require('../controllers/interactionController');
const userLibraryController = require('../controllers/userLibraryController');
const bookshelfController = require('../controllers/bookshelfController');
const privacyController = require('../controllers/privacyController');
const progressController = require('../controllers/progressController');
const wallController = require('../controllers/wallController');
const wallObserver = require('../middleware/wallObserver');
const auth = require('../middleware/authentication');
const UserController = require('../controllers/userController');

module.exports = express
    .Router()
    .get('/library/topfavorites/:username', bookshelfController.getTopFavorites)
    .post('/library/topfavorites', auth.authenticateUser, bookshelfController.addTopFavoriteBook)
    .get('/library/:bookshelf', auth.authenticateUser, bookshelfController.getBooks)
    .post('/library/:bookshelf', auth.authenticateUser, wallObserver.readRequest, bookshelfController.addBookToBookshelf)
    .put('/library/:bookshelf', auth.authenticateUser, bookshelfController.removeBookFromBookshelf)
    .post('/request/:type', auth.authenticateUser, interactionController.requestFacade)
    .get('/friends', auth.authenticateUser, interactionController.getFriends)
    .get('/friends/all', auth.authenticateUser, interactionController.getCompleteFrienshipInfo)
    .get('/friends/candidates', auth.authenticateUser, interactionController.getCandidates)
    .post('/friends/invitation/:action', auth.authenticateUser, wallObserver.readRequest, interactionController.handleInvitations)
    .get('/search/:query', userLibraryController.getBookResult)
    .get('/progress/:isbn', auth.authenticateUser, progressController.getProgress)
    .put('/progress', auth.authenticateUser, wallObserver.readRequest, progressController.updateProgress)
    .get('/reviews/:bookIsbn', userLibraryController.getReview)
    .post('/reviews/:bookIsbn', auth.authenticateUser, wallObserver.readRequest, userLibraryController.createReview)
    .get('/ratings/:bookIsbn', userLibraryController.getRating)
    .post('/ratings/:bookIsbn', auth.authenticateUser, wallObserver.readRequest, userLibraryController.createRating)
    .get('/feedbacks/:bookIsbn', bookshelfController.getFeedbacks)
    .get('/wall/public', auth.authenticateUser, wallController.getPublicWall)
    .get('/wall/:username', wallController.getPrivateWall)
    .post('/wall/:id/likes', wallController.toggleLikes)
    .post('/wall/:id/comments', wallController.addComment)
    .delete('/wall/comments/:id', wallController.deleteComment)
    .get('/wall/:id/comments', wallController.getComments)
    .get('/privacy/:username/:privacyType', auth.authenticateUser, privacyController.getSettingsForPrivacyType)
    .post('/privacy/:username', auth.authenticateUser, privacyController.changeSettings)
    .get('/users/description/:username', UserController.getDescription)
    .post('/users/description/:username', auth.authenticateUser, UserController.updateDescription);
