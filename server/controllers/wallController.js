const WallPost = require('../models/wallPost');
const Friendship = require('../models/friendship');


const getPrivateWall = async (req, res) => {
    var posts = await WallPost.find({ owner: req.cookies.username })
    posts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.send(posts)
}


const getPublicWall = async (req, res) => {
    var posts = await WallPost.find({ owner: req.cookies.username })
    const friendsObj = await Friendship.list(req.cookies.username);
    const friends = friendsObj.friends;
    for (var i = 0; i < friends.length; i++) {
        var friendsPosts = await WallPost.find({ owner: friends[i].username })
        posts = posts.concat(friendsPosts)
    }
    posts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.send(posts)
}


module.exports = {
    getPublicWall,
    getPrivateWall
}