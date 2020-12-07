const Bookshelves = require('../models/bookshelves');
const Book = require('../models/book');
const User = require('../models/user').User;
const BookFlyweight = require('../models/bookFlyweight');
const Message = require('../models/message');
const observer = require('../lib/observer');


const getBooks = async (req, res) => {
    const username = req.cookies.username
    const user = await User.findOne({ username: username })
    const books = await Bookshelves.getBooks(user, req.params.bookshelf)
    const result = []
    let i;
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
            authors: req.body.authors,
            isbn: req.body.isbn,
            description: req.body.description,
            pageCount: req.body.pageCount
        })
    }
    var book = await Book.findOne({ flyweight: flyweight, owner: owner })
    if (!book) { book = await Book.createBook(flyweight, owner) }
    await observer.addBookshelfObserver(req.params.bookshelf, owner, flyweight);

    try {
        // Update rating when adding to favorite shelf
        console.log(req.params.bookshelf)
        if (req.params.bookshelf.toLowerCase() === 'favorites') {
            await BookFlyweight.updateLikeDislike({
                id: book.flyweight._id,
                from: book.rating,
                to: 'like',
            })

            await book.updateRating('like')
        }
        await Bookshelves.addBookToBookshelf(owner, req.params.bookshelf, book)
        res.sendStatus(201)
    }
    catch (e) {
        console.log("err:", e)
        res.sendStatus(500)
    }
}

const removeBookFromBookshelf = async (req, res) => {
    if (req.cookies.username && req.params.bookshelf && req.body.isbn) {
        const username = req.cookies.username;
        const owner = await User.findOne({ username: username });

        var flyweight = await BookFlyweight.get(req.body.isbn);
        if (!flyweight) {
            res.sendStatus(400)
        }

        var book = await Book.findOne({ flyweight: flyweight, owner: owner });
        if (!book) {
            res.sendStatus(400)
        }

        try {
            // Update rating when removing from favorites shelf
            if (req.params.bookshelf.toLowerCase() === 'favorites') {
                await BookFlyweight.updateLikeDislike({
                    id: book.flyweight._id,
                    from: 'like',
                    to: 'none',
                })

                await book.updateRating('none')
            }

            await Bookshelves.removeBook(owner, req.params.bookshelf, book);
            res.status(201).json({ message: "DELETE BOOK" });
        }
        catch (e) {
            console.log('err:', e);
            res.sendStatus(500);
        }
    } else {
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

const addTopFavoriteBooks = async (req, res) => {
    const username = req.cookies.username
    const owner = await User.findOne({ username: username })
    const books_isbn = req.body.isbns

    try {
        let i;
        for (i = 0; i < books_isbn.length; i++) {
            var flyweight = await BookFlyweight.get(books_isbn[i])
            var book = await Book.findOne({ flyweight: flyweight, owner: owner })
            // if (!book) { book = await Book.createBook(flyweight, owner) }
            await Bookshelves.addBookToBookshelf(owner, 'topFavorites', book)
        }
        res.status(201);

    } catch(err) {
        console.log(err);
        res.status(500);
    }



    // var flyweight = await BookFlyweight.get(req.body.isbn)
    // if (!flyweight) {
    //     flyweight = await BookFlyweight.create({
    //         title: req.body.title,
    //         thumbnail: req.body.thumbnail,
    //         authors: req.body.authors,
    //         isbn: req.body.isbn,
    //         description: req.body.description,
    //         pageCount: req.body.pageCount
    //     })
    // }
    // var book = await Book.findOne({ flyweight: flyweight, owner: owner })
    // if (!book) { book = await Book.createBook(flyweight, owner) }
    // await observer.addBookshelfObserver(req.params.bookshelf, owner, flyweight);

    // try {
    //     // Update rating when adding to favorite shelf
    //     // console.log(req.params.bookshelf)
    //     // if (req.params.bookshelf.toLowerCase() === 'favorites') {
    //     //     await BookFlyweight.updateLikeDislike({
    //     //         id: book.flyweight._id,
    //     //         from: book.rating,
    //     //         to: 'like',
    //     //     })

    //     //     await book.updateRating('like')
    //     // }
    //     await Bookshelves.addBookToBookshelf(owner, req.params.bookshelf, book)
    //     res.sendStatus(201)
    // }
    // catch (e) {
    //     console.log("err:", e)
    //     res.sendStatus(500)
    // }
}
// const getFavoriteBooks = async (req, res) => {
//     const username = req.cookies.username
//     const user = await User.findOne({ username: username })
//     const books = await Bookshelves.getBooks(user, "favorites")
//     const result = []
//     let i;
//     for (i = 0; i < books.length; i++) {
//         var foundBook = await Book.findById(books[i])
//         var foundFlyweight = await BookFlyweight.findById(foundBook.flyweight)
//         result.push(foundFlyweight)
//     }
//     console.log(result);
//     if (result.length === 0) {
//         res.status(205);
//     } else {
//         res.status(200);
//         res.send(result);
//     }

// }


module.exports = {
    getBooks,
    addBookToBookshelf,
    getFeedbacks,
    addTopFavoriteBooks,
    removeBookFromBookshelf
}