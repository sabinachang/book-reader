const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    bookFlyweight: { type: mongoose.Schema.Types.ObjectId, ref: 'BookFlyweight' },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    }  , 
    {
        timestamps: true,
    },
);

schema.statics.getReviews = async function (filter) {
    const reviews = await this.find(filter)
     await this.populate(reviews,{
        path: 'creator',
        select: '_id username'
    })
    return reviews
}

schema.statics.createReview = async function ({ bookFlyweight, creator, content }) {
    const review =  await this.create({
        bookFlyweight,
        creator,
        content,
    })

    return await this.populate(review, {
        path: 'creator',
        select: '_id username',
    })
}
module.exports = mongoose.model('Message', schema);