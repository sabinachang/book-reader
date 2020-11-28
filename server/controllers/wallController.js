const WallPost = require('../models/wallPost');
const Friendship = require('../models/friendship');


const getPrivateWall = async (req, res) => {
    const posts = await WallPost.find({ owner: req.cookies.username })
    res.send(posts)
}


const getPublicWall = async (req, res) => {
    var posts = await WallPost.find({ owner: req.cookies.username })
    const friends = await Friendship.list(req.cookies.username);
    for (var i = 0; i < friends.length; i++) {
        var friendsPosts = await WallPost.find({ owner: friends[i] })
        posts = posts.concat(friendsPosts)
    }
    posts = posts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    res.send(posts)
}


module.exports = {
    getPublicWall,
    getPrivateWall
}