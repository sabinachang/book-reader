const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    author: String,
    body: String
}
);



module.exports = mongoose.model('Comment', schema);