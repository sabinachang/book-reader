const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    flyweight: { type: mongoose.Schema.Types.ObjectId, ref: 'BookFlyweight' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // TODO: decideds how to store progress & rating
    progress: Number,
    rating: Number,
    review: String,
});

schema.statics.createBook = async function createBook({ flyweight, owner}) {
    return await this.create({
        flyweight,
        owner,
    });
}

module.exports = mongoose.model('Book', schema);