const Bookshelves = require('../models/bookshelves');
const Book = require('../models/book');
const BookFlyweight = require('../models/bookFlyweight');

const getBooks = async (req, res) => {
    console.log(req.params)
    const books = await Bookshelves.getBooks(req.body.username, req.params.bookshelf)
    res.send(books)
}

const addBookToBookshelf = async (req, res) => {
    console.log(req.body)
    console.log(req.params)

    // const owner = User.findOne({username: username})
    // var flyweight = BookFlyweight.get(req.body.isbn)
    // if (!flyweight) {
    //     flyweight = { 
    //         title: req.body.title,
    //         thumbnail: req.body.thumbnail,
    //         author: req.body.author,
    //         isbn: req.body.isbn,
    //         description: req.body.description}
    //     }
    // var book = Book.find({flyweight: flyweight, owner: owner})
    // if (!book) {book = Book.createBook(flyweight, owner)
    
    try {
        await Bookshelves.addBookToBookshelf(req.body.username, req.params.bookshelf, book)
        res.sendStatus(201)
    }
    catch {
        res.sendStatus(500)
    }
   
}

module.exports = {
    getBooks, 
    addBookToBookshelf
}