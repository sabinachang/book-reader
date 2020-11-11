const mongoose = require('mongoose');
const { User } = require('./user');

const schema = new mongoose.Schema({
    me: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

schema.statics.findOrCreateFriendship = async function findOrCreateFriendship(me) {
    let friendship = await this.findOne({ me: me });

    // no friendship exists for me yet, create one
    if (!friendship) {
        friendship = await this.create({
            me: me,
            friends: [],
            invitations: [],
        });
    }
    return friendship;
}

// List all friends belong to me
schema.statics.list = async function list(me) {
    const friendship = await this.findOrCreateFriendship(me);
    return await this.populate(friendship, {
        path: 'friends',
        select: '_id username'
    });
}

// List all users who aren't friends with me yet
schema.statics.listCandidates = async function listCandidates(me) {
    const friendship = await this.findOrCreateFriendship(me);
    const m = await User.findOne({username: me});
    return await User.aggregate([
        { 
            // Dont list current friend, myself, and people who already invited me
            $match: {
                    $and: [
                    { _id: { $nin: friendship.friends} },
                    { _id: { $ne: m._id} },
                    { _id: { $nin: friendship.invitations} },
                    ]
                }, 
        },
        {
            $project: {
                username: 1,
            }
        }
    ])
}

// send invitation 
schema.statics.sendInvitation = async function sendInvitation(me, to) {
    const friendship = await this.findOrCreateFriendship(to);
    const m = await User.findOne({ username: me });

    // friend already exists, do nothing
     if (friendship.friends.includes(m._id)) {
        return;
    }

    // invitation already send, do nothing
    if (friendship.invitations.includes(m._id)) {
        return;
    }

    friendship.invitations.push(m._id);
    await friendship.save();
}

// list invitations
schema.statics.listInvitations = async function listInvitations(me) {
    const friendship = await this.findOrCreateFriendship(me);
    return await this.populate(friendship, {
        path: 'invitations',
        select: '_id username'
    })

}

// add friend as me's friend
schema.statics.add = async function add(me, friend) {
   
    const friendship = await this.findOrCreateFriendship(me);
    const otherFriendship = await this.findOrCreateFriendship(friend);

    const m = await User.findOne({ username: me });
    const f = await User.findOne({ username: friend });

    // friend already exists, do nothing
    if (friendship.friends.includes(f._id)) {
        return;
    }

    // remove each other from each other's invitatioin
    let found = friendship.invitations.indexOf(f._id);
    if (found != -1) {
        friendship.invitations.splice(found, 1)
    }
    found = otherFriendship.invitations.indexOf(m._id);
    if (found != -1) {
        otherFriendship.invitations.splice(found, 1)
    }

    otherFriendship.friends.push(m._id);
    friendship.friends.push(f._id);
    await otherFriendship.save();
    await friendship.save();
}
module.exports = mongoose.model('Friendship', schema);