const axios = require('axios');

// Singleton getter
function getBookSearch() {
	if (bookSearchInstance == null) {
		bookSearchInstance = new bookSearchProxy();
	}
	return bookSearchInstance;
}

let bookSearchInstance = null;

class bookSearchProxy {
	getBaseUrl(query) {
		return 'https://www.googleapis.com/books/v1/volumes?q=' + query;
	}

	getKey() {
		return '&key=AIzaSyCzt3rMLM1vtDOFRgwLO1dfIqT1o3HO7Tk';
	}

	getLanguage(language) {
		return '&langRestrict=' + language;
	}

	getStartIndex(startIndex) {
		return '&startIndex=' + startIndex;
	}

	getURL(query, startIndex, language='en') {
		return this.getBaseUrl(query) + this.getLanguage(language) + this.getStartIndex(startIndex) + this.getKey();
	}

	async searchBook(query, startIndex, language='en') {
		const url = this.getURL(query, startIndex, language);
		return await axios.get(url);

	}
}

module.exports = getBookSearch;
