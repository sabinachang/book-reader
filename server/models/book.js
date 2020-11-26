const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    flyweight: { type: mongoose.Schema.Types.ObjectId, ref: 'BookFlyweight' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // TODO: decideds how to store progress & rating
    progress: Number,
    rating: Number,
    review: String,
});

schema.statics.createBook = async function(flyweight, owner) {
    return await this.create({
        flyweight,
        owner,
    });
}

schema.statics.updateProgress = async function(flyweight, owner, progressNum) {
    return await this.updateOne({
        flyweight: flyweight,
        owner: owner,
    },{
        progress: progressNum
    });
}

schema.statics.getProgress = async function(flyweight, owner) {
    return await this.find()
}

schema.statics.calculateProgress = function(pageNum, totalPage) {
    return Math.round(pageNum / totalPage * 100);
}

module.exports = mongoose.model('Book', schema);