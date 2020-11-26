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
    like: Number,
    dislike: Number,
});

schema.statics.createFlyweight = async function createFlyweight({
    title,
    thumbnail,
    authors,
    isbn,
    description = '',
}) {
    return await this.create({
        title,
        thumbnail,
        authors,
        isbn,
        description
    });
}

// Use ISBN to check if our db already contains this book
// If so, return the flyweight part
schema.statics.get = async function get(isbn) {
    return await this.findOne({ isbn: isbn });
}

schema.statics.updateLikeDislike = async function ({id, from, to}) {
    const flyweight = await this.findOne({_id: id})

    let currentLike = 0
    let currentDislike = 0

    if (flyweight.like) {
        currentLike = flyweight.like
    } 
    if (flyweight.dislike) {
        currentDislike = flyweight.dislike
    }
     
    if (from === 'like') {
        currentLike -= 1
    } else if (from === 'dislike') {
        currentDislike -= 1
    }

    if (to === 'like') {
        currentLike += 1
    } else if (to === 'dislike') {
        currentDislike += 1
    }


    return await flyweight.updateOne({ 
        like: currentLike, 
        dislike: currentDislike
    });
}
module.exports = mongoose.model('BookFlyweight', schema);
