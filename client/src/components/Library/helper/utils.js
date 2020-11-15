import axios from 'axios'

const mapBookshelfToImg = (bookshelfName) => {
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

const mapBookshelfToUrl = (bookshelfName) => {
    switch (bookshelfName.toLowerCase()) {
        case "reading":
            return "reading"
        case "read":
            return "read"
        case "want to read":
            return "wantToRead"
        case "recommendations":
            return "recommendations"
        case "favorites":
            return "favorites"
        default:
            throw Error("Invalid Bookshelf")
    }
}

const getBooksInBookshelf = (bookshelf_name, callback) => {
    axios.get(`http://localhost:5000/api/library/${bookshelf_name}`, { withCredentials: true })
        .then((res) => {
            callback(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
}

function urlify(img) {
    return "url('" + img + "')"
}
export { mapBookshelfToImg, getBooksInBookshelf, mapBookshelfToUrl }