const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    hash: String,
    salt: String,
    bookshelves: { type: mongoose.Schema.Types.ObjectId, ref: 'Bookshelves' },
    privacySettings: { type: mongoose.Schema.Types.ObjectId, ref: 'PrivacySettings' },
    description: String,
});

const User = mongoose.model('User', userSchema);

async function createNewUser(username, hash, salt) {
    const newUser = new User({
        username: username,
        hash: hash,
        salt: salt,
    });
    return newUser.save();
}

function findUserByUsername(username) {
    return User.findOne({ username: username }, { _id: 0, __v: 0 });
}

async function updateUserDescription(username, description) {
    return await User.findOneAndUpdate({username: username}, {description: description})
}

module.exports = {
    User,
    createNewUser,
    findUserByUsername,
    updateUserDescription
}