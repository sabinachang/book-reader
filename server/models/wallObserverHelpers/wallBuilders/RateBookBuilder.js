const AbstractBuilder = require('./AbstractWallBuilder')
const BookFlyweight = require('../../bookFlyweight')

class RateBookBuilder extends AbstractBuilder {
    constructor() {
        super()
    }

    makeNewRating = (request_body) => {
        return request_body.rating.from === "none" ||
            (request_body.rating.from !== request_body.rating.to && request_body.rating.to !== "none")
    }

    async make(req) {
        const username = req.cookies.username;
        const request_body = req.body;
        console.log(request_body)
        var flyweight = await BookFlyweight.get(req.params.bookIsbn)
        const authors = flyweight.authors.length === 0 ? "Unknown Author" : flyweight.authors[0]
        var title;
        console.log(request_body.rating.from, request_body.rating.to, request_body.rating.from !== request_body.rating.to)
        if (request_body.rating.from === "none") {
            title = `${username} ${request_body.rating.to}d '${flyweight.title}' by ${authors}`
        } else if (request_body.rating.to === "none") {
            title = `${username} removed their ${request_body.rating.from} from '${flyweight.title}' by ${authors}`
        } else {
            title = `${username} ${request_body.rating.to}d '${flyweight.title}' by ${authors} and removed their old ${request_body.rating.from} from it.`
        }
        super.make({
            title: title,
            owner: username
        });

        this.wallPost.images.push(flyweight.thumbnail);
        super.save();
        console.log("Saved to database...", this.wallPost);
    }
}


module.exports = RateBookBuilder;