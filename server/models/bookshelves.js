const mongoose = require('mongoose');
const User = require('./user.js');

const schema = new mongoose.Schema({
    username: String,
    reading: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    wantToRead: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    read: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
})

schema.statics.getBooks = async function (username, bookshelf) {
    var bookshelf_obj = await this.findOne({username: username}).exec()
    if (!bookshelf_obj) {
        // console.log("create")
        bookshelf_obj = await this.create({username: username, reading: [], wantToRead: [], read: [], favorites: []})
    }
    // console.log(bookshelf_obj)
    var result = []
    switch(bookshelf.toLowerCase()) {
        case "reading":
            result = bookshelf_obj.reading
            break;
        case "wanttoread":
            console.log("yes, here")
            result = bookshelf_obj.wantToRead
            break;
        case "wanttoread":
            result = bookshelf_obj.read
            break;
        case "favorites":
            result = bookshelf_obj.favorites
            break;
        default:
          throw "Non Existent Bookshelf"
      }
    return ["want to read"]


}

module.exports = mongoose.model('Bookshelves', schema);
