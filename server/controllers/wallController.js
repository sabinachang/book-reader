const WallPost = require('../models/wallPost').RefinedModel;
const Friendship = require('../models/friendship');


const getPrivateWall = async (req, res) => {
    try {
        const targetUser = req.params.username;
        const loggedInUser = req.cookies.username
        const posts = await WallPost.getPrivatePosts(targetUser, loggedInUser)
        res.send(posts)
    } catch (err) {
        console.log("Error:", err)
        let status = 403
        if (err.message === "This user does not exist") {
            status = 404
        }
        res.status(status).json({ err: err })
    }

}


const getPublicWall = async (req, res) => {
    const friendsObj = await Friendship.list(req.cookies.username);
    const posts = await WallPost.getPublicPosts(req.cookies.username, friendsObj.friends)
    res.send(posts)
}

const toggleLikes = async (req, res) => {
    try {
        const index = await WallPost.toggleLikes(req.cookies.username, req.params.id)
        if (index > -1) {
            res.status(200).json({ msg: 'like removed' })
        } else {
            res.status(201).json({ msg: 'like added' })
        }
    } catch (err) {
        res.status(403).json({ err: err })
    }



}

const addComment = async (req, res) => {
    try {
        const comment = await WallPost.postComment
            (req.cookies.username, req.params.id, req.body.comment)
        res.status(200).json({ msg: 'comment added', comment: comment })
    } catch (err) {
        res.status(403).json({ err: err })
    }


}
const deleteComment = async (req, res) => {
    // TODO: Implement
    await WallPost.deleteComment(req.params.id, req.body.comment, req.cookies.username);
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