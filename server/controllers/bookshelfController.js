const Bookshelves = require('../models/bookshelves');

const getBooks = async (req, res) => {
    console.log(req.params)
    const books = await Bookshelves.getBooks(req.body.username, req.params.bookshelf)
    res.send(books)
}

module.exports = {getBooks}