const WallPost = require('../models/wallPost').RefinedModel;
const Friendship = require('../models/friendship');
const Comment = require('../models/comment');


const getPrivateWall = async (req, res) => {
    const targetUser = req.cookies.username;
    // NOTE: targetUser will likely change to req.params.targetUser
    const loggedInUser = req.cookies.username
    const posts = await WallPost.getPrivatePosts(targetUser, loggedInUser)
    res.send(posts)
}


const getPublicWall = async (req, res) => {
    // assumes there is a isAuthorized middleware; 
    // nobody but the current user should see this person's public wall
    const friendsObj = await Friendship.list(req.cookies.username);
    const posts = await WallPost.getPublicPosts(req.cookies.username, friendsObj.friends)
    res.send(posts)
}

const toggleLikes = async (req, res) => {

    const index = await WallPost.toggleLikes(req.cookies.username, req.params.id)
    if (index > -1) {
        res.status(200).json({ msg: 'like removed' })
    } else {
        res.status(201).json({ msg: 'like added' })
    }

}

const addComment = async (req, res) => {
    const comment = await WallPost.postComment
        (req.cookies.username, req.params.id, req.body.comment)
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
    const comments = await WallPost.getComments(req.params.id);
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