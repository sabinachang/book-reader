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
            image: req.body.thumbnail
        })

        // Can later have more complex functions for building an event on the wall
        super.save()
        console.log("Saved to database...")
    }

}


module.exports = AddToBookshelfBuilder;