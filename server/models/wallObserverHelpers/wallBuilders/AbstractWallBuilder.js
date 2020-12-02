const WallPost = require("../../wallPost").BaseModel

class Builder {
    constructor() {
        this.wallPost = null;
    }
    make(obj) {
        console.log("Boilerplate logic for all events")
        this.wallPost = new WallPost({
            owner: obj.owner,
            title: obj.title,
        })
    }
    async save() {
        await this.wallPost.save()
        this.wallPost = null
    }
}


module.exports = Builder;