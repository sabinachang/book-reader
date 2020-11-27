const AbstractBuilder = require('./AbstractWallBuilder')

class AddToBookshelfBuilder extends AbstractBuilder {
    constructor() {
        super()
    }

    make(req) {
        const username = req.cookies.username;
        const request_body = req.body;
        console.log("making post on wall about adding to bookshelf")
        super.make({
            title: `${username} added '${request_body.title}' to their '${req.params.bookshelf}' bookshelf`,
            owner: username
        });
        // Can have more complex functions for building an event on the wall
        this.wallEvent.image = req.body.thumbnail;
        super.save();
        console.log("Saved to database...");
    }
}


module.exports = AddToBookshelfBuilder;