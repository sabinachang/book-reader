const WallPost = require('../models/wallPost');
const Friendship = require('../models/friendship');


const getPrivateWall = async (req, res) => {
    var posts = await WallPost.find({ owner: req.cookies.username })
    posts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.send(posts)
}


const getPublicWall = async (req, res) => {
    var posts = await WallPost.find({ owner: req.cookies.username })
    const friends = await Friendship.list(req.cookies.username);
    for (var i = 0; i < friends.length; i++) {
        var friendsPosts = await WallPost.find({ owner: friends[i] })
        posts = posts.concat(friendsPosts)
    }
    console.log(posts[0])
    posts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    console.log(posts[0])

    res.send(posts)
}


module.exports = {
    getPublicWall,
    getPrivateWall
}