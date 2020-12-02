const mongoose = require('mongoose');


const privacySchema = new mongoose.Schema({
    whoCanViewProfile: { type: String, default: "everybody" },
    whoCanLikePosts: { type: String, default: "everybody" },
    whoCanCommentOnPosts: { type: String, default: "everybody" },
})

module.exports = mongoose.model('PrivacySettings', privacySchema);

