const getBookSearch = require('../models/bookSearch');
const axios = require('axios');
const { review, rating } = require('../lib/feedbackTemplate');

const bookSearch = getBookSearch()

const getBookResult = async function (req, res, next) {
	if (req.params.query) {
		const query = req.params.query;
		let bookResult = null;
		const startIndex = req.query.startIndex
		const url = bookSearch.getURL(query, startIndex);
		await axios.get(url)
			.then((res) => {
				bookResult = res.data;
			})
			.catch((err) => {
				console.log(err);
			})
		res.status(200);
		res.json({ 'result': bookResult });
	} else {
		res.status(400);
		res.json({ 'error': 'Missing param' })
		console.log('Missing param');
	}
}

const createReview = async function (req, res, next) {
	const isbn = req.params.bookIsbn
	const username = req.cookies.username
	const content = req.body.review

	const response = await review.generate({ isbn, username, content });

	if (response.result === 'ok') {
		res.status(200).json({
			review: response.review,
		})
	} else {
		res.sendStatus(400)
	}
}

const createRating = async function (req, res, next) {
	const isbn = req.params.bookIsbn
	const username = req.cookies.username
	const content = req.body.rating
	const response = await rating.generate({ isbn, username, content });

	if (response.result === 'ok') {
		// if (response.updateFavorite) {
		// 	req.app.io.sockets.emit("updateBookFavorite", isbn)
		// }
		res.status(200).json({
			rating: response.rating,
		})
	} else {
		res.sendStatue(400)
	}
}

const getReview = async function (req, res, next) {
	const isbn = req.params.bookIsbn
	const username = req.cookies.username

	const response = await review.retrieve({ isbn, username })

	if (response.result === 'ok') {
		res.status(200).json({
			review: response.review,
		})
	} else {
		res.sendStatue(500)
	}
}

const getRating = async function (req, res, next) {
	const isbn = req.params.bookIsbn
	const username = req.cookies.username

	const response = await rating.retrieve({ isbn, username })

	if (response.result === 'ok') {
		res.status(200).json({
			rating: response.rating,
		})
	} else {
		res.sendStatue(500)
	}
}

module.exports = {
	getBookResult,
	createRating,
	createReview,
	getReview,
	getRating
}