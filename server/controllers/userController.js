const {
    User,
    createNewUser,
} = require('../models/user');

const { genHashAndSalt } = require('../lib/password');