const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    author: String,
    body: String,
    timestamp: { type: Date, default: Date.now },
}
);



module.exports = mongoose.model('Comment', schema);