const AddToBookshelfBuilder = require("./wallBuilders/AddToBookshelfBuilder")
const FriendshipBuilder = require("./wallBuilders/FriendshipBuilder")

class Director {
    create = (req) => {
        const request_type = req.body.request_type
        console.log("Director", request_type)
        switch (request_type) {
            case 'rate_book':
                console.log('Creating a post about rating a book.');
                break;
            case 'friendship-accept':
                console.log("Creating a post about adding a friend.");
                const friendshipBuilder = new FriendshipBuilder()
                friendshipBuilder.make(req)
                break
            case 'add_book_to_bookshelf':
                console.log('Creating a post about adding a book to bookshelf.');
                const addToBookshelfBuilder = new AddToBookshelfBuilder()
                addToBookshelfBuilder.make(req)
                break;
            default:
                console.log(`${request_type} not registered.`);
        }
    }
}

const director = new Director()

module.exports = director