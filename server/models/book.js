const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    flyweight: { type: mongoose.Schema.Types.ObjectId, ref: 'BookFlyweight' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // TODO: decideds how to store progress & rating
    progress: Number,

    //rating options: ['like', 'dislike', 'none']
    rating: String,
    review: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
});

schema.statics.createBook = async function(flyweight, owner) {
    return await this.create({
        flyweight,
        owner,
        rating: 'none'
    });
}

schema.methods.addReview = async function(review) {
    return await this.updateOne({ review });
}

schema.methods.updateRating = async function(rating) {
    return await this.updateOne({ rating });
}

module.exports = mongoose.model('Book', schema);