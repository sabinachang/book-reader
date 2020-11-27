const Bookshelves = require('../models/bookshelves');
const Book = require('../models/book');
const User = require('../models/user').User;
const BookFlyweight = require('../models/bookFlyweight');


class progressController {
    static async updateProgress(req, res) {
    	if (req && req.cookies && req.cookies.username && 
            req.body && req.body.isbn && req.body.pageNum) {
    		const username = req.cookies.username;
    		const owner = await User.findOne({username: username});
    		var flyweight = await BookFlyweight.get(req.body.isbn);
    		var book = await Book.findOne({flyweight: flyweight, owner: owner});
    		const totalPage = flyweight.pageCount;
            if (book.progress && totalPage) {
                const progress = Book.calculateProgress(req.body.pageNum, totalPage);
                console.log('progress: ',progress,'%');
                try {
                    await Book.updateProgress(flyweight, owner, progress);
                    res.status(200).json({message: progress});
                    if (progress === 100) {
                        console.log('move to read'); //TODO: add Observer?
                        await Bookshelves.addBookToBookshelf(owner, 'read', book)
                    }
                } catch (err) {
                    console.log(err);
                }     
            } else {
                res.status(400);
                res.json({'error': 'No permission to track progress'});
            }
    	} else {

    		res.status(400).json({'error': 'Missing params'})
    	}
    }

    static async getProgress(req, res) {
        try {
            if (req && req.cookies && req.cookies.username 
                && req.params && req.params.isbn) {
                const username = req.cookies.username;
                const owner = await User.findOne({username: username});
                var flyweight = await BookFlyweight.get(req.params.isbn);
                var book = await Book.findOne({flyweight: flyweight, owner: owner});
                if (book.progress) {
                    res.status(200).json({message: book.progress})
                } else {
                    res.status(400).json({'error': 'Progress Undefined'})
                }
            } else {
                res.status(400).json({'error': 'Missing params'})
            }
        } catch (err) {
            console.log(err);
        }
    }

    // get all reading progress
    // static async getProgress(req, res) {
    //     if (req && req.cookies && req.cookies.username && req.params && req.params.bookshelf) {
    //         const username = req.cookies.username;
    //         const owner = await User.findOne({username: username});
    //         const reading_id = await Bookshelves.getBooks(owner, 'reading');

    //         result = []
    //         for (i=0; i<reading.length; i++) {
    //             var reading = await Book.findById(reading_id[i]);
    //             console.log(reading.progress)
    //             result.push(reading.progress)
    //         }
    //         res.json({'result': result}).status(200);
    //     } else {
    //         res.status(400).json({'error': 'Missing params'})
    //     }
    // }

}

module.exports = progressController;
