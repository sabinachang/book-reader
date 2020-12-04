const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    owner: String,
    title: String,
    images: [String],
    bodyText: String,
    likes: [String],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
    timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model('WallPost', schema);