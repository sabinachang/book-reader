const express = require('express');
const LoginController = require('../controllers/loginController');
const UserController = require('../controllers/userController');

module.exports = express
    .Router()
    .post('/', LoginController.login)
    .post('/register', UserController.createUser);