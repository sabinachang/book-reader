const Bookshelves = require('../models/bookshelves');
const Book = require('../models/book');
const User = require('../models/user').User;
const BookFlyweight = require('../models/bookFlyweight');
const Message = require('../models/message');

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
    console.log(req.body)
    if (!flyweight) {
        flyweight = await BookFlyweight.create({
            title: req.body.title,
            thumbnail: req.body.thumbnail,
            authors: req.body.authors,
            isbn: req.body.isbn,
            description: req.body.description
        })
    }
    var book = await Book.findOne({ flyweight: flyweight, owner: owner })
    if (!book) { book = await Book.createBook(flyweight, owner) }
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
    const username = req.cookies.username
    const owner = await User.findOne({ username: username })
    var flyweight = await BookFlyweight.get(req.body.isbn)
    if (!flyweight) {
        res.sendStatus(400)
    }
    var book = await Book.findOne({ flyweight: flyweight, owner: owner })
    if (!book) {
        res.sendStatus(400)
    }
    try {

        await Bookshelves.removeBook(owner, req.params.bookshelf, book)
        res.sendStatus(201)
    }
    catch (e) {
        console.log("err:", e)
        res.sendStatus(500)
    }
}

const getFeedbacks = async (req, res) => {
    const isbn = req.params.bookIsbn
    try {
        const flyweight = await BookFlyweight.get(isbn)
        if (flyweight !== null) {
            const filter = { bookFlyweight: flyweight._id }

            const reviews = await Message.getReviews(filter)
            let like = flyweight.like
            let dislike = flyweight.dislike

            if (!like) {
                like = 0
            }
            if (!dislike) {
                dislike = 0
            }
            res.status(200).json({
                likeCount: like,
                dislikeCount: dislike,
                reviews,
            })
        } else {
            res.sendStatus(205)
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }


}

module.exports = {
    getBooks,
    addBookToBookshelf,
    getFeedbacks,
    removeBookFromBookshelf,
}