const express = require('express');
const interactionController = require('../controllers/interactionController');
const userLibraryController = require('../controllers/userLibraryController');
const bookshelfController = require('../controllers/bookshelfController');
const wallController = require('../controllers/wallController');
const wallObserver = require('../middleware/wallObserver');

module.exports = express
    .Router()
    .get('/library/:bookshelf', bookshelfController.getBooks)
    .post('/library/:bookshelf', wallObserver.readRequest, bookshelfController.addBookToBookshelf)
    .post('/request/:type', interactionController.requestFactory)
    .get('/friends', interactionController.getFriends)
    //TODO combine with /friends
    .get('/friendship/all', interactionController.getCompleteFrienshipInfo)
    .post('/friendship/invitation/:action', wallObserver.readRequest, interactionController.handleInvitations)
    .get('/search/:query', userLibraryController.getBookResult)
    .get('/wall/public', wallController.getPublicWall)
    .get('/wall/private', wallController.getPrivateWall);

