const WallPost = require('../models/wallPost');
const Friendship = require('../models/friendship');


const getPrivateWall = async (req, res) => {
    var posts = await WallPost.find({ owner: req.cookies.username })
    posts = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.send(posts)
}


const getPublicWall = async (req, res) => {
    var posts = await WallPost.find({ owner: req.cookies.username })
    console.log("get public wall", req.cookies.username)
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

const toggleLikes = async (req, res) => {
    var post = await WallPost.findOne({_id: req.params.id});
    const username = req.cookies.username
    console.log(username)
    const index = post.likes.indexOf(req.cookies.username);

    if (index > -1) {
        post.likes.splice(index, 1);
        await post.save()
        res.status(200).json({msg: 'like removed'})

    } else {
        post.likes.push(req.cookies.username)
        await post.save()
        res.status(201).json({msg: 'like added'})

}
    
}


module.exports = {
    getPublicWall,
    getPrivateWall,
    toggleLikes
}