const AbstractBuilder = require('./AbstractWallBuilder')
const Book = require('../../book')
const BookFlyweight = require('../../bookFlyweight')

class BookProgressBuilder extends AbstractBuilder {
    constructor() {
        super()
    }

    async make(req) {
        const username = req.cookies.username;
        const request_body = req.body;
        const flyweight = await BookFlyweight.get(request_body.isbn);
        const totalPage = flyweight.pageCount;
        const progress = Book.calculateProgress(request_body.pageNum, totalPage);
        const authors = flyweight.authors.length === 0 ? "Unknown Author" : flyweight.authors[0]
        super.make({
            title: `${username} is ${progress}% done with '${flyweight.title}' by ${authors}!`,
            owner: username
        });

        this.wallPost.images.push(flyweight.thumbnail);
        super.save();
        console.log("Saved to database...", this.wallPost);
    }
}


module.exports = BookProgressBuilder;