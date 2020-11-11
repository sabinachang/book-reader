const getBookSearch = require('../models/bookSearch');
const axios = require('axios');

const bookSearch = getBookSearch()

exports.getBookResult = async function getBookResult(req, res, next) {
	if (req.params.query) {
		query = req.params.query;
		bookResult = null;
		baseurl = 'https://www.googleapis.com/books/v1/volumes?q=' 
		keyurl = ':keyes&key=' + bookSearch.getKey();
		console.log('search query: ', query)
		await axios.get(baseurl + query + keyurl)
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

