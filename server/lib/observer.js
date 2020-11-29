const Bookshelves = require('../models/bookshelves');
const Book = require('../models/book');


exports.addBookshelfObserver = async function addBookshelfObserver(bookshelf, owner, flyweight) {
	try {
		if (bookshelf === 'Reading') {
			Book.updateProgress(flyweight, owner, 0).then((result) => {
				console.log('Progress=0%');
			}).catch((err) => {
				console.log(err);
			})
		} else if (bookshelf === 'Read') {
			Book.updateProgress(flyweight, owner, 100).then((result) => {
				console.log('Progress=100%');
			}).catch((err) => {
				console.log(err);
			})
		}
	} catch (err) {
		console.log(err);	
	}

}

exports.progressObserver = async function progressObserver(progress, owner, book) {
	try {
		if (progress === 100) {
			Bookshelves.addBookToBookshelf(owner, 'read', book).then((result) => {
				console.log('MoveToRead');
			}).catch((err) => {
				console.log(err);
			})
		}
	} catch (err) {
		console.log(err);
	}

}


