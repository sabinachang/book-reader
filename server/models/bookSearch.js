
// Singleton getter
function getBookSearch() {
	if (bookSearchInstance == null) {
		bookSearchInstance = new bookSearch();
	}
	return bookSearchInstance;
}

let bookSearchInstance = null;

class bookSearch {
	getKey() {
		const apiKey = 'AIzaSyCzt3rMLM1vtDOFRgwLO1dfIqT1o3HO7Tk';
		return apiKey;
	}
}

module.exports = getBookSearch;
