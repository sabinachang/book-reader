import axios from 'axios'

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

export { getBooksInBookshelf, mapBookshelfToUrl }