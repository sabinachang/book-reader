const getBookSearch = require('../models/bookSearch');
const axios = require('axios');

const bookSearch = getBookSearch()

exports.getBookResult = async function getBookResult(req, res, next) {
	if (req.params.query) {
		const query = req.params.query;
		let bookResult = null;
		const url = bookSearch.getURL(query);
		console.log('search url: ', url);

		await axios.get(url)
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

