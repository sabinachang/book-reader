const mongoose = require('mongoose');
const User = require('./user.js');
const Book = require('./book.js');
const BookFlyweight = require('./bookFlyweight.js');

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
            break
        case "recommendations":
            break;
    
        default:
          throw "Non Existent Bookshelf"
    }
   
}

schema.statics.addBook = function (bookshelf,book, bookshelfObj) {
    switch(bookshelf.toLowerCase()) {
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

schema.statics.addBookHelper = function(bookshelfArr, book) {
    if (!bookshelfArr.includes(book._id)) {
        bookshelfArr.push(book._id);
    } else{
        return
    }
}

schema.statics.addBookToBookshelf = async function (username, bookshelf, book) {
    var bookshelfObj = await this.findOne({username: username}).exec()
    if (!bookshelfObj) {
        bookshelfObj = await this.create({username: username, reading: [], wantToRead: [], read: [], favorites: [], recommendations: [],})
    }
    // console.log('before add bookshelf', bookshelfObj)
    this.addBook(bookshelf, book, bookshelfObj)
    this.removeFromOtherBookshelves(bookshelf, book, bookshelfObj)
    console.log(bookshelfObj)
    await bookshelfObj.save()

}

module.exports = mongoose.model('Bookshelves', schema);
