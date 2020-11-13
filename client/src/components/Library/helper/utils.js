function mapBookshelfToImg(bookshelfName) {
    switch (bookshelfName.toLowerCase()) {
        case "reading":
            return urlify("http://clipart-library.com/img1/680631.jpg")
        case "read":
            return urlify("https://publicdomainvectors.org/photos/Bookshelves-Blue-Books.png")
        case "want to read":
            return urlify("http://clipart-library.com/img/2099343.jpg")
        case "recommendations":
            return urlify("http://clipart-library.com/image_gallery/53419.jpg")
        case "favorites":
            return urlify("http://clipart-library.com/img1/839924.png")
        default:
            throw Error("Invalid Bookshelf")
    }
}

function urlify(img) {
    return "url('" + img + "')"
}
module.exports = { mapBookshelfToImg }