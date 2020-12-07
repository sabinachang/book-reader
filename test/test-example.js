const getBookSearch = require('../server/models/bookSearch');

const bookSearch = getBookSearch();

test('Test get google book search api', function() {
	const baseUrl = bookSearch.getBaseUrl();
	expect(baseUrl).toBe('https://www.googleapis.com/books/v1/volumes?q=');
})

test('Test get google book search index parameter', function() {
	const indexparam = bookSearch.getStartIndex('2');
	expect(indexparam).toBe('&startIndex=2');
})
