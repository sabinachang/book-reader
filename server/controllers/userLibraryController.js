const getBookSearch = require('../models/bookSearch');
const axios = require('axios');
const {review, rating} = require('../lib/feedbackTemplate');

const bookSearch = getBookSearch()

exports.getBookResult = async function getBookResult(req, res, next) {
	if (req.params.query) {
		query = req.params.query;
		bookResult = null;
		baseurl = 'https://www.googleapis.com/books/v1/volumes?q=' 
		startIndexQuery = '&startIndex=' + req.query.startIndex
		keyurl = '&key=' + bookSearch.getKey();
		console.log('search query: ', query)
		await axios.get(baseurl + query + startIndexQuery + keyurl)
		.then((res) => {
			bookResult = res.data;
		})
		.catch((err) => {
			console.log(err);
		})
		res.status(200);
		res.json({'result': bookResult});
	} else {
		res.status(400);
		res.json({'error': 'Missing param'})
		console.log('Missing param');
	}
}

exports.createReview = async function (req, res, next) {
	const isbn = req.params.bookIsbn
	const username = req.cookies.username
	const content = req.body.review
	
	const response = await review.generate({ isbn, username, content});
	console.log(response)

	if (response.result === 'ok') {
		res.status(200).json({
			review: response.review,
		})
	} else {
		res.sendStatus(400)
	}
}

exports.createRating = async function(req, res, next) {
	const isbn = req.params.bookIsbn
	const username = req.cookies.username
	const content = req.body.rating
	const response = await rating.generate({ isbn, username, content});
	console.log(response)

	if (response.result === 'ok') {
		if (response.updateFavorite) {
			req.app.io.sockets.emit("updateBookFavorite", isbn)
		}
		res.status(200).json({
			rating: response.rating,
		})
	} else {
		res.sendStatue(400)
	}
}

exports.getReview = async function(req, res, next) {
	const isbn = req.params.bookIsbn
	const username = req.cookies.username

	const response = await review.retrieve({ isbn, username })

	console.log(response)
	if (response.result === 'ok') {
		res.status(200).json({
			review: response.review,
		})
	} else {
		res.sendStatue(500)
	}
}

exports.getRating = async function(req, res, next) {
	const isbn = req.params.bookIsbn
	const username = req.cookies.username

	const response = await rating.retrieve({ isbn, username })

	console.log(response)
	if (response.result === 'ok') {
		res.status(200).json({
			rating: response.rating,
		})
	} else {
		res.sendStatue(500)
	}
}
