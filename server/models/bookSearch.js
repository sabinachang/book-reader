
// Singleton getter
function getBookSearch() {
	if (bookSearchInstance == null) {
		bookSearchInstance = new bookSearch();
	}
	return bookSearchInstance;
}

let bookSearchInstance = null;

class bookSearch {
	getBaseUrl() {
		const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
		return baseUrl;
	}

	getKey() {
		return '&key=' + process.env.API_KEY;
	}

	getLang(lang='en'){
		return '&langRestrict=' + lang;
	}

	getURL(query, lang='en') {
		return this.getBaseUrl() + query + this.getLang(lang) + this.getKey();
	}
}

module.exports = getBookSearch;
