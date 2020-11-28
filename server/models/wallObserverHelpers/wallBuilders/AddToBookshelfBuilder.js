const AbstractBuilder = require('./AbstractWallBuilder')
const { addSpacesToBookshelf } = require('../../../lib/helper')


class AddToBookshelfBuilder extends AbstractBuilder {
    constructor() {
        super()
    }

    make(req) {
        const username = req.cookies.username;
        const request_body = req.body;
        console.log("making post on wall about adding to bookshelf")
        super.make({
            title: `${username} added '${addSpacesToBookshelf(request_body.title)}' to their '${req.params.bookshelf}' bookshelf`,
            owner: username
        });
        // Can have more complex functions for building an event on the wall
        this.wallPost.images.push(req.body.thumbnail);
        console.log(this.wallPost)
        super.save();
        console.log("Saved to database...");
    }
}


module.exports = AddToBookshelfBuilder;