const Bookshelves = require('../models/bookshelves');
const Book = require('../models/book');
const User = require('../models/user').User;
const BookFlyweight = require('../models/bookFlyweight');

const getBooks = async (req, res) => {
    const username = 'justin-starks'
    const books = await Bookshelves.getBooks(username, req.params.bookshelf)
    var result = []
    for (i = 0; i < books.length; i++) {
        var foundBook = await Book.findById(books[i])
        var foundFlyweight = await BookFlyweight.findById(foundBook.flyweight)
        result.push(foundFlyweight)
    }
    res.send(result)
}

const addBookToBookshelf = async (req, res) => {
    // console.log(req.body, 'body')
    // console.log(req.params,'params')
    const username = 'justin-starks'
    const owner = await User.findOne({ username: username })
    var flyweight = await BookFlyweight.get(req.body.isbn)
    if (!flyweight) {
        flyweight = await BookFlyweight.create({
            title: req.body.title,
            thumbnail: req.body.thumbnail,
            author: req.body.author[0],
            isbn: req.body.isbn,
            description: req.body.description
        })
    }
    var book = await Book.findOne({ flyweight: flyweight, owner: owner })
    if (!book) { book = await Book.createBook(flyweight, owner) }
    try {
        await Bookshelves.addBookToBookshelf(username, req.params.bookshelf, book)
        res.sendStatus(201)
    }
    catch (e) {
        console.log("err:", e)
        res.sendStatus(500)
    }

}

module.exports = {
    getBooks,
    addBookToBookshelf
}