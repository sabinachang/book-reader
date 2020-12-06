const express = require('express');
const UserController = require('../controllers/userController');

module.exports = express
    .Router()
    .get('/authenticate', UserController.checkAuth)
    .post('/login', UserController.login)
    .post('/register', UserController.createUser)
    .post('/logout', UserController.logout)