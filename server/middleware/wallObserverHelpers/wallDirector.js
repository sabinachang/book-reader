const wallBuilder = require('./wallBuilder');

class Director {
    constructor(builder) {
        this.builder = builder
    }

    create = (request_type) => {
        this.builder.reset()
        switch (request_type) {
            case 'rate_book':
                console.log('Creating a post about rating a book.');
                break;
            case 'add_friend':
                console.log("Creating a post about adding a friend.");
                break
            case 'add_book_to_bookshelf':
                console.log('Creating a post about adding a book to bookshelf.');
                break;
            default:
                console.log(`${request_type} not registered.`);
        }
    }
}

const director = new Director(wallBuilder)

module.exports = director