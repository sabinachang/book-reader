const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    reading: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    wantToRead: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    read: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
})

schema.statics.getBooks = async function (u, bookshelf) {
    // need to get make u an instance of User to be able to call save()
    const user = await mongoose.model('User').findOne({ _id: u._id });

    const bookshelfId = user.bookshelves;
    let bookshelfObj = await this.findOne({ _id: bookshelfId })

    if (!bookshelfObj) {
        bookshelfObj = await this.create({ reading: [], wantToRead: [], read: [], favorites: [] });
        user.bookshelves = bookshelfObj;
        await user.save()
    }
    var result = []
    switch (bookshelf.toLowerCase()) {
        case "reading":
            result = bookshelfObj.reading
            break;
        case "wanttoread":
            result = bookshelfObj.wantToRead
            break;
        case "read":
            result = bookshelfObj.read
            break;
        case "favorites":
            result = bookshelfObj.favorites
            break;
        case "recommendations":
            result = bookshelfObj.recommendations
            break;
        default:
            throw "Non Existent Bookshelf"
    }

    return result
}

schema.statics.removeFromBookshelf = function (bookshelf, book) {
    const found = bookshelf.indexOf(book._id)
    if (found !== -1) {
         bookshelf.splice(found, 1)
    }
}


schema.statics.removeFromOtherBookshelves = function (bookshelf, book, bookshelfObj) {
    switch (bookshelf.toLowerCase()) {
        case "reading":
            this.removeFromBookshelf(bookshelfObj.wantToRead, book)
            this.removeFromBookshelf(bookshelfObj.read, book)
            break;
        case "wanttoread":
            this.removeFromBookshelf(bookshelfObj.reading, book)
            this.removeFromBookshelf(bookshelfObj.read, book)
            break;
        case "read":
            this.removeFromBookshelf(bookshelfObj.wantToRead, book)
            this.removeFromBookshelf(bookshelfObj.reading, book)
            break;
        case "favorites":
            break
        case "recommendations":
            break;

        default:
            throw "Non Existent Bookshelf"
    }

}

schema.statics.addBook = function (bookshelf, book, bookshelfObj) {
    switch (bookshelf.toLowerCase()) {
        case "reading":
            this.addBookHelper(bookshelfObj.reading, book)
            break
        case "wanttoread":
            this.addBookHelper(bookshelfObj.wantToRead, book)
            break
        case "read":
            this.addBookHelper(bookshelfObj.read, book)
            break
        case "favorites":
            this.addBookHelper(bookshelfObj.favorites, book)
            break
        case "recommendations":
            this.addBookHelper(bookshelfObj.recommendations, book)
            break;
        default:
            throw "Non Existent Bookshelf"
    }
}

schema.statics.addBookHelper = function (bookshelfArr, book) {
    if (!bookshelfArr.includes(book._id)) {
        bookshelfArr.push(book._id);
    } 
}

schema.statics.addBookToBookshelf = async function (u, bookshelf, book) {

    // need to get make u an instance of User to be able to call save()
    const user = await mongoose.model('User').findOne({ _id: u._id });
    
    const bookshelfId = user.bookshelves;
    var bookshelfObj = await this.findOne({ _id: bookshelfId })

    if (!bookshelfObj) {
        bookshelfObj = await this.create({ reading: [], wantToRead: [], read: [], favorites: [], recommendations: [], })
        user.bookshelves = bookshelfObj
        await user.save()
    }
    this.addBook(bookshelf, book, bookshelfObj)
    this.removeFromOtherBookshelves(bookshelf, book, bookshelfObj)
    await bookshelfObj.save()

}

schema.statics.removeBook = async function (u, bookshelf, book) {
    const user = await mongoose.model('User').findOne({ _id: u._id });
    
    const bookshelfId = user.bookshelves;
    var bookshelfObj = await this.findOne({ _id: bookshelfId })

    switch (bookshelf.toLowerCase()) {
        case "reading":
            break;
        case "wanttoread":
            break;
        case "read":
            break;
        case "favorites":
            this.removeFromBookshelf(bookshelfObj.favorites, book)
            break
        case "recommendations":
            break;

        default:
            throw "Non Existent Bookshelf"
    }
    await bookshelfObj.save()
}

module.exports = mongoose.model('Bookshelves', schema);
