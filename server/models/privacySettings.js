const mongoose = require('mongoose');
const { User } = require('./user');
const Friendship = require('../models/friendship');


const privacySchema = new mongoose.Schema({
    whoCanViewProfile: { type: String, default: "everybody" },
    whoCanLikePosts: { type: String, default: "everybody" },
    whoCanCommentOnPosts: { type: String, default: "everybody" },
})
const PrivacyModel = mongoose.model('PrivacySettings', privacySchema)

class PrivacySettings {
    constructor(PrivacyModel) {
        this.PrivacyModel = PrivacyModel
    }
    create = () => {
        return this.PrivacyModel.create({})
    }
    getSettings = async (targetUser) => {
        const user = await User.findOne({ username: targetUser })
        if (!user) {
            throw new Error("This user does not exist")
        }
        if (!user.privacySettings) {
            user.privacySettings = await this.create()
            await user.save()
        }
        const privacy_id = user.privacySettings;
        return this.PrivacyModel.findById(privacy_id)
    }

    canVerify = async (setting, targetUser, loggedInUser) => {
        switch (setting) {
            case "everybody":
                return true
            case "friends":
                const friends_obj = await Friendship.list(targetUser);
                const friendlist = friends_obj.friends.map((friend) => friend.username);
                return friendlist.includes(loggedInUser) || targetUser === loggedInUser;
            case "me":
                return targetUser === loggedInUser;
            default:
                throw new Error("Invalid privacy setting.")
        }
    }

    verify = async (privacy_type, targetUser, loggedInUser) => {
        const settings = await this.getSettings(targetUser)
        const setting = settings[privacy_type]
        const verfied =  await this.canVerify(setting, targetUser, loggedInUser)
        console.log("verfied", verfied)
        if (!verfied) {
            if (setting === 'friends') {
                throw new Error("Only friends of this person can view their profile")
            }
            else {
                throw new Error("This person's profile is private.")
            }
        }
        console.log("should be finished")
    }
}

const privacySettings = new PrivacySettings(PrivacyModel)

module.exports = privacySettings