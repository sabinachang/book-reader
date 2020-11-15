import axios from 'axios'
import blueBookshelf from './blueBookshelves.png'
import standardBookshelf from './standardBookshelf.jpg'
import cartoonBookshelf from './cartoonBookshelf.jpg'
import cartoonBookshelf2 from './cartoonBookshelf2.jpg'
import fancyBookshelf from './fancyBookshelf.png'

const mapBookshelfToImg = (bookshelfName) => {
    switch (bookshelfName.toLowerCase()) {
        case "reading":
            return urlify(standardBookshelf)
        case "read":
            return urlify(blueBookshelf)
        case "want to read":
            return urlify(cartoonBookshelf)
        case "recommendations":
            return urlify(fancyBookshelf)
        case "favorites":
            return urlify(cartoonBookshelf2)
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