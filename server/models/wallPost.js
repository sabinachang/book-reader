const mongoose = require('mongoose');
const Comment = require('../models/comment');


const schema = new mongoose.Schema({
    owner: String,
    title: String,
    images: [String],
    bodytext: String,
    likes: [String],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    timestamp: { type: Date, default: Date.now },
})

const BaseModel = mongoose.model('WallPost', schema)

class WallPost {
    constructor(wallPostModel) {
        this.WallPost = wallPostModel
    }

    async getPosts(targetUser, loggedInUser) {
        // check privacy settings of targetUser 
        // could also have a privacy.verify("view profile", targetUser, loggedInUser)

        // if privacy.whoCanViewProfile === everyone or loggedInUser.isFriend(targetUser)....
        return this.WallPost.find({ owner: targetUser })

        // else if  privacy.whoCanViewProfile === friends:
        // throw new Error("Only friends of this person can view their profile")
        // else  privacy.whoCanViewProfile === me
        // throw new Error("This person's profile is private.")
    }

    async getPrivatePosts(targetUser, loggedInUser) {
        return getPosts(targetUser, loggedInUser)
            .then(posts => {
                return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            })
    }

    async getPublicPosts(username, friends) {
        return this.getPosts(username, username)
            .then(async posts => {
                for (var i = 0; i < friends.length; i++) {
                    try {
                        var friendsPosts = await this.getPosts(friends[i].username, username)
                        posts = posts.concat(friendsPosts)
                    } catch (err) {

                    }

                }
                return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            })
    }

    async toggleLikes(username, post_id) {
        var post = await this.WallPost.findOne({ _id: post_id });
        const index = post.likes.indexOf(username);
        if (index > -1) {
            post.likes.splice(index, 1);
            await post.save()
        } else {
            post.likes.push(username)
            await post.save()
        }
        return index
    }

    async postComment(username, post_id, comment_body) {
        const post = await this.WallPost.findOne({ _id: post_id });
        console.log(post)
        console.log(comment_body)
        const comment = await Comment.create({
            author: username,
            body: comment_body
        })
        console.log(comment)
        post.comments.push(comment);
        await post.save()
        return comment
    }

    async getComments(post_id) {
        var post = await this.WallPost.findOne({ _id: post_id });
        var commentIds = post.comments;
        var comments = []
        for (var i = 0; i < commentIds.length; i++) {
            var comment = await Comment.findById(commentIds[i])
            comments.push(comment)
        }
        return comments
    }
}

const wallPost = new WallPost(BaseModel)

module.exports = { BaseModel: BaseModel, RefinedModel: wallPost };