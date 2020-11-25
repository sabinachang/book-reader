const AddToBookshelfBuilder = require("./wallBuilders/AddToBookshelfBuilder")

class Director {
    create = (req) => {
        switch (req.body.request_type) {
            case 'rate_book':
                console.log('Creating a post about rating a book.');
                break;
            case 'add_friend':
                console.log("Creating a post about adding a friend.");
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