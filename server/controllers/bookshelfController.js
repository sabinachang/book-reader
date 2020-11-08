const Bookshelves = require('../models/bookshelves');
const Book = require('../models/book');

const getBooks = async (req, res) => {
    console.log(req.params)
    const books = await Bookshelves.getBooks(req.body.username, req.params.bookshelf)
    res.send(books)
}

const addBookToBookshelf = async (req, res) => {
    console.log(req.body)
    console.log(req.params)

    // We need a Book.getBook(title) function to pass into addToBookshelves
    try {
        await Bookshelves.addBookToBookshelf(req.body.username, req.params.bookshelf, req.body.book)
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