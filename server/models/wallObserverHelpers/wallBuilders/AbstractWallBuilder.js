const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    owner: String,
    title: String,
    image: String,
    bodyText: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
    timestamp: { type: Date, default: Date.now },
})

const WallEvent = mongoose.model('WallEvents', schema);

class Builder {
    constructor() {
        this.wallEvent = null;
    }
    make(obj) {
        console.log("Boilerplate logic for all events")
        this.wallEvent = new WallEvent({
            owner: obj.owner,
            title: obj.title,
        })
    }
    async save() {
        await this.wallEvent.save()
        this.wallEvent = null
    }
}


module.exports = Builder;