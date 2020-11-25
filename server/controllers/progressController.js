const Bookshelves = require('../models/bookshelves');
const Book = require('../models/book');
const User = require('../models/user').User;
const BookFlyweight = require('../models/bookFlyweight');


class progressController {
    static async updateProgress(req, res) {
    	if (req && req.cookies && req.cookies.username && req.body && req.body.isbn && req.body.pageNum) {
    		const username = req.cookies.username;
    		const owner = await User.findOne({username: username});
    		var flyweight = await BookFlyweight.get(req.body.isbn);
    		var book = await Book.findOne({flyweight: flyweight, owner: owner});
    		const totalPage = flyweight.pageCount;
    		const progress = Book.calculateProgress(req.body.pageNum, totalPage);
    		console.log('progress: ',progress,'%');
    		try {
    			await Book.updateProgress(flyweight, owner, progress);
    			res.status(200).json({message: 'UPDATE PROGRESS'});
    		} catch (err) {
    			console.log(err);
    		}

    	} else {

    		res.status(400).json({'error': 'Missing params'})
    	}
    }

    static async getProgress(req, res) {
    	if (req && req.cookies && req.cookies.username && req.params && req.params.bookshelf) {
    		const username = req.cookies.username;
    		const owner = await User.findOne({username: username});
    		const reading_id = await Bookshelves.getBooks(owner, 'reading');

    		result = []
    		for (i=0; i<reading.length; i++) {
    			var reading = await Book.findById(reading_id[i]);
    			console.log(reading.progress)
    			result.push(reading.progress)
    		}
    		res.json({'result': result}).status(200);
    	} else {
    		res.status(400).json({'error': 'Missing params'})
    	}
    }
}

module.exports = progressController;
