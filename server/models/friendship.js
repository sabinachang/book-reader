const mongoose = require('mongoose');
const { User } = require('./user');

const schema = new mongoose.Schema({
    me: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

schema.statics.list = async function list(me) {
    return await this.findOne({ me: me }).populate('friends');
}

schema.statics.add = async function add(me, friend) {
    let friendship = await this.findOne({ me: me });

    // no friendship exists for me yet, create one
    if (!friendship) {
        friendship = await this.create({
            me: me,
            friends: [],
        });
    }

    const f = await User.findOne({ username: friend });
    friendship.friends.push(f._id);
    await friendship.save();

}
module.exports = mongoose.model('Friendship', schema);