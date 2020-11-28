const Bookshelves = require('../models/bookshelves');
const BookFlyweight = require('../models/bookFlyweight');
const { User } = require('../models/user');
const Book = require('../models/book');

exports.generateRequest = async function generateRequest(to, req) {
    // TODO extract conversion logic
    // TODO handle repeated recommendation (?)
    let flyweight = await BookFlyweight.get(req.body.isbn)
    if (!flyweight) {
       const d = { 
            title: req.body.title,
            thumbnail: req.body.thumbnail,
            author: req.body.author,
            isbn: req.body.isbn,
            description: req.body.description}

       flyweight = await BookFlyweight.createFlyweight(d);
    } 
    const match = await Book.findOne({flyweight: flyweight._id, owner: to})
    let book;
    const toUser = await User.findOne({ _id: to });

    if (!match)  {
        // This person does not have this book in the library, create a document 
        const b = await Book.createBook(flyweight._id, to)
        book = b._id
    } else {
        const list = await Bookshelves.getBooks(toUser, 'recommendations');
        
        // This person already has this book in recommendation shelf, return as success
        if (list.includes(match._id)) {
            console.log('already in recommend');
            return Promise.resolve(true)
        }

        // This person has this book in other shelf, recommend anyway (for now)
        book = match._id
    }
    return await Bookshelves.addBookToBookshelf(toUser, 'recommendations', book);
}