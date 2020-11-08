const mongoose = require('mongoose');
const User = require('./user.js');

const schema = new mongoose.Schema({
    username: String,
    reading: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    wantToRead: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    read: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    recommendations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
})

schema.statics.getBooks = async function (username, bookshelf) {
    var bookshelfObj = await this.findOne({username: username}).exec()
    if (!bookshelfObj) {
        bookshelfObj = await this.create({username: username, reading: [], wantToRead: [], read: [], favorites: []})
    }
    var result = []
    switch(bookshelf.toLowerCase()) {
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

schema.statics.removeFromBookshelf = function(bookshelf, book) {
    const found = bookshelf.indexOf(book)
    if (found) {
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
        case "recommendations":
            break;
    
        default:
          throw "Non Existent Bookshelf"
    }
   
}

schema.statics.addBookToBookshelf = async function (username, bookshelf, book) {
    var bookshelfObj = await this.findOne({username: username}).exec()
    if (!bookshelfObj) {
        bookshelfObj = await this.create({username: username, reading: [], wantToRead: [], read: [], favorites: [], recommendations: [],})
    }
    switch(bookshelf.toLowerCase()) {
        case "reading":
            bookshelfObj.reading.push(book);
            break;
        case "wanttoread":
            bookshelfObj.wantToRead.push(book);
            break;
        case "read":
            bookshelfObj.read.push(book);
            break;
        case "favorites":
            bookshelfObj.favorites.push(book);
            break;
        case "recommendations":
            bookshelfObj.recommendations.push(book);
            break;
        default:
          throw "Non Existent Bookshelf"
      }
    this.removeFromOtherBookshelves(bookshelf, book, bookshelfObj)
    await bookshelfObj.save()

}

module.exports = mongoose.model('Bookshelves', schema);
