const BookFlyweight = require( '../models/bookFlyweight');
const  Book = require( '../models/book');
const Message = require( '../models/message');
const {User} = require('../models/user');
const Bookshelves = require('../models/bookshelves')

let feedbackTemplate =  {
    getBook: async function(isbn, user) {
        const flyweight = await BookFlyweight.get(isbn)
        if (flyweight !== null) {
            const book = await Book.findOne({ flyweight: flyweight._id, owner: user._id })
            return book;
        }
        return null
    },

    getUser: async function(username) { 
        return await User.findOne({username})
    },

    generate: async function({ isbn, username, content }) {
        const user = await this.getUser(username);
        const book = await this.getBook(isbn, user);

        if ( book !== null ){
            const result = await this.add({book, user, content})

            return result
        } else {
            return {
                result: 'error',
            }
        }
    }
}
 
function inherit(proto) {
    var F = function() { };
    F.prototype = proto;
    return new F();
}

//concrete review handler
let review = inherit(feedbackTemplate)

review.add = async function({book, user, content}) {
    console.log('adding review')
    try {
        const r = await Message.createReview({
            bookFlyweight: book.flyweight,
            creator: user._id,
            content,
        })
        console.log(r)

        await book.addReview(r._id)
    
        return {
            result: 'ok',
            review: r,
        }
    } catch(err) {
        console.log(err)
        return {
            result: 'error',
        }
    }
   
}

review.retrieve = async function ({ isbn, username }) {
    try {
        const flyweight = await BookFlyweight.get(isbn)
        console.log(flyweight)
        const u = await this.getUser(username)
        const filter = {
            bookFlyweight: flyweight._id,
            creator: u._id,
        }
        
        const review =  await Message.getReviews(filter)
        return {
            result: 'ok',
            review,
        }
    } catch (err) {
        console.log(err)
        return {
            result: 'error',
        }
    }
   
}

//concrete rating handler
let rating = inherit(feedbackTemplate)

rating.add = async function({ book, user, content }) {
    console.log('adding rating')
    console.log(content)
    try {
        await BookFlyweight.updateLikeDislike({
            id: book.flyweight._id,
            from: content.from,
            to: content.to,
        })

        await book.updateRating(content.to)

        if (content.from === 'like') {
            await  Bookshelves.removeBook(user, 'favorites', book)
            
        }

        if (content.to === 'like') {
            await Bookshelves.addBookToBookshelf(user, 'favorites', book)
        }
        return {
            result: 'ok',
            updateFavorite: ((content.from === 'like') || (content.to === 'like')),
            rating: content.to,
        }
    } catch (err) {
        console.log(err)
        return {
            result: 'error',
        }
    }
}

rating.retrieve = async function ({ isbn, username }) {
    try {
        const user = await this.getUser(username)
        const book = await this.getBook(isbn, user)

        if (book !== null) {
            let r = 'none'
            if (book.rating) {
                r = book.rating
            }
            return {
                result: 'ok',
                rating: r,
            }
        } else {
            return {
                result: 'error'
            }
        }
        
       
    } catch (err) {
        console.log(err)
        return {
            result: 'error',
        }
    }
   
}

module.exports = { review, rating }