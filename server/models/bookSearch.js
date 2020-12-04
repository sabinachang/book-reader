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
		// &orderBy=relevance
		const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
		return baseUrl;
	}

	getKey() {
		return '&key=AIzaSyCzt3rMLM1vtDOFRgwLO1dfIqT1o3HO7Tk' 
	}

	getLang(lang='en'){
		return '&langRestrict=' + lang;
	}

	getStartIndex(startIndex) {
		return '&startIndex=' + startIndex;
	}

	getURL(query, startIndex, lang='en') {
		return this.getBaseUrl() + query + this.getLang(lang) + this.getStartIndex(startIndex) + this.getKey();
	}
}

module.exports = getBookSearch;
