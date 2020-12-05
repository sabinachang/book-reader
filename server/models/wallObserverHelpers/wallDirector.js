const AddToBookshelfBuilder = require("./wallBuilders/AddToBookshelfBuilder")
const FriendshipBuilder = require("./wallBuilders/FriendshipBuilder")
const ReviewBookBuilder = require("./wallBuilders/ReviewBookBuilder")
const RateBookBuilder = require("./wallBuilders/RateBookBuilder")
const BookProgressBuilder = require("./wallBuilders/BookProgressBuilder")

class Director {
    create = (req) => {
        const request_type = req.body.request_type
        console.log("Director", request_type)
        switch (request_type) {
            case 'rate-book':
                const rateBookBuilder = new RateBookBuilder()
                rateBookBuilder.make(req)
                break;
            case 'friendship-accept':
                const friendshipBuilder = new FriendshipBuilder()
                friendshipBuilder.make(req)
                break
            case 'add_book_to_bookshelf':
                const addToBookshelfBuilder = new AddToBookshelfBuilder()
                addToBookshelfBuilder.make(req)
                break;
            case 'review-book':
                const reviewBookBuilder = new ReviewBookBuilder()
                reviewBookBuilder.make(req)
                break;
            case 'book-progress':
                const bookProgressBuilder = new BookProgressBuilder()
                bookProgressBuilder.make(req)
                break;
            default:
                console.log(`${request_type} not registered.`);
        }
    }
}

const director = new Director()

module.exports = director