const Bookshelves = require('../models/bookshelves');
const Book = require('../models/book');
const User = require('../models/user').User;
const BookFlyweight = require('../models/bookFlyweight');


const getBooks = async (req, res) => {
    const username = req.cookies.username
    const user = await User.findOne({ username: username })
    const books = await Bookshelves.getBooks(user, req.params.bookshelf)

    var result = []
    for (i = 0; i < books.length; i++) {
        var foundBook = await Book.findById(books[i])
        var foundFlyweight = await BookFlyweight.findById(foundBook.flyweight)
        result.push(foundFlyweight)
    }
    res.send(result)
}

const addBookToBookshelf = async (req, res) => {
    const username = req.cookies.username
    const owner = await User.findOne({ username: username })
    var flyweight = await BookFlyweight.get(req.body.isbn)

    if (!flyweight) {
        flyweight = await BookFlyweight.create({
            title: req.body.title,
            thumbnail: req.body.thumbnail,
            author: req.body.authors,
            isbn: req.body.isbn,
            description: req.body.description,
            pageCount: req.body.pageCount
        })
    }
    var book = await Book.findOne({ flyweight: flyweight, owner: owner })
    if (!book) { book = await Book.createBook(flyweight, owner) }

    if (req.params.bookshelf === 'Reading') {
        await Book.updateProgress(flyweight, owner, 0);
    } else if (req.params.bookshelf === 'Read') {
        await Book.updateProgress(flyweight, owner, 100);
    }

    try {
        await Bookshelves.addBookToBookshelf(owner, req.params.bookshelf, book)
        res.sendStatus(201)
    }
    catch (e) {
        console.log("err:", e)
        res.sendStatus(500)
    }
}

const removeBookFromBookshelf = async (req, res) => {
    // CAN BE IMPROVE: WORK BUT NEED REFRESH
    if (req.cookies.username && req.params.bookshelf && req.body.isbn) {
        const username = req.cookies.username;
        const owner = await User.findOne({ username: username });
        var flyweight = await BookFlyweight.get(req.body.isbn);

        var book = await Book.findOne({ flyweight: flyweight, owner: owner });

        try {
            await Bookshelves.removeBook(owner, req.params.bookshelf, book);
            res.status(200).json({message: "DELETE BOOK"});
        }
        catch (e) {
            console.log('err:', e);
            res.status(500);
        }
    }
    
}

module.exports = {
    getBooks,
    addBookToBookshelf,
    removeBookFromBookshelf
}