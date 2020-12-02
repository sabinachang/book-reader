const AbstractBuilder = require('./AbstractWallBuilder')
const BookFlyweight = require('../../bookFlyweight')

class ReviewBookBuilder extends AbstractBuilder {
    constructor() {
        super()
    }

    async make(req) {
        const username = req.cookies.username;
        const request_body = req.body;
        var flyweight = await BookFlyweight.get(req.params.bookIsbn)
        const authors = flyweight.authors.length === 0 ? "Unknown Author" : flyweight.authors[0]
        super.make({
            title: `${username} added a review to '${flyweight.title}' by ${authors}`,
            owner: username
        });

        this.wallPost.images.push(flyweight.thumbnail);
        this.wallPost.bodytext = request_body.review;
        super.save();
        console.log("Saved to database...", this.wallPost);
    }
}


module.exports = ReviewBookBuilder;