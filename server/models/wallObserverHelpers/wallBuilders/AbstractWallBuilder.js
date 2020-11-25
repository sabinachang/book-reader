const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    title: String,
    timestamp: { type: Date, default: Date.now },
    image: String,
    bodyText: String
})

const WallEvent = mongoose.model('WallEvents', schema);

class Builder {
    constructor() {
        this.wallEvent = null;
    }
    make(obj) {
        console.log("Boilerplate logic for all events")
        this.wallEvent = new WallEvent({ title: obj.title, image: obj.image, bodyText: obj.bodyText })
    }
    async save() {
        await this.wallEvent.save()
        this.wallEvent = null
    }
}


module.exports = Builder;