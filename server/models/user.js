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
    recommend: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
});

userSchema.statics.displayRecommendShelf = async function displayRecommendShelf() {
    // TODO use _id to findOne
    const { recommend } = await this.findOne({ username: 'sab4'}, 'recommend -_id')
                            .populate({ path: 'recommend'});

    return await mongoose.model('Book').populate(recommend,
        [{ path: 'flyweight'}, { path: 'owner', select: 'username'}]);
}

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