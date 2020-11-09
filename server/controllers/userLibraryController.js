
const axios = require('axios');

exports.getBookResult = async function getBookResult(req, res, next) {
	if (req.params.query) {
		query = req.params.query;
		bookResult = null;
		console.log(query);
		await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + query)
		.then((res) => {
			bookResult = res.data.items;
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

