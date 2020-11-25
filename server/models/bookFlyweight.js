const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    authors: [{
        type: String,
        required: true,
    }],
    isbn: {
        type: String,
        required: true,
    },
    description: String,
    pageCount: {
        type: Number,
        required: true,
    }
});

schema.statics.createFlyweight = async function createFlyweight({
    title,
    thumbnail,
    authors,
    isbn,
    description = '',
    pageCount,
}) {
    return await this.create({
        title,
        thumbnail,
        authors,
        isbn,
        description,
        pageCount
    });
}

// Use ISBN to check if our db already contains this book
// If so, return the flyweight part
schema.statics.get = async function get(isbn) {
    return await this.findOne({ isbn: isbn });
}

module.exports = mongoose.model('BookFlyweight', schema);
