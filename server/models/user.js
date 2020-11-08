const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    hash: String,
    salt: String,
});

const User = mongoose.model('User', userSchema);

function createNewUser(username, email, hash, salt) {
    const newUser = new User({
        username: username,
        email: email,
        hash,
        salt,
    });
    return newUser.save();
}

module.exports = {
    User,
    createNewUser
}