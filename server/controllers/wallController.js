const WallPost = require('../models/wallPost');
const Friendship = require('../models/friendship');
const Comment = require('../models/comment');


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

const toggleLikes = async (req, res) => {
    var post = await WallPost.findOne({ _id: req.params.id });
    const username = req.cookies.username
    const index = post.likes.indexOf(username);
    if (index > -1) {
        post.likes.splice(index, 1);
        await post.save()
        res.status(200).json({ msg: 'like removed' })

    } else {
        post.likes.push(req.cookies.username)
        await post.save()
        res.status(201).json({ msg: 'like added' })

    }

}

const addComment = async (req, res) => {
    var post = await WallPost.findOne({ _id: req.params.id });
    var comment = await Comment.create({
        author: req.cookies.username,
        body: req.body.comment
    })
    post.comments.push(comment);
    await post.save()
    console.log(post.comments)
    res.status(200).json({ msg: 'comment added', comment: comment })

}
const deleteComment = async (req, res) => {
    var post = await WallPost.findOne({ _id: req.params.id });
    var comments = post.comments;
    // Iterate through comments and delete right one
    console.log(req.body.comment)
    console.log(req.params.id)
    console.log(req.cookies.username)
    res.status(201).json({ msg: 'comment deleted' })

}

const getComments = async (req, res) => {
    var post = await WallPost.findOne({ _id: req.params.id });
    var commentIds = post.comments;
    var comments = []
    for (var i = 0; i < commentIds.length; i++) {
        var comment = await Comment.findById(commentIds[i])
        comments.push(comment)
    }
    console.log(comments)
    res.status(200).json(comments)

}

module.exports = {
    getPublicWall,
    getPrivateWall,
    toggleLikes,
    addComment,
    deleteComment,
    getComments
}