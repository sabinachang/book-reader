const AbstractBuilder = require('./AbstractWallBuilder')


class FriendshipBuilder extends AbstractBuilder {
    constructor() {
        super()
    }

    make(req) {
        const username = req.cookies.username;
        const request_body = req.body;
        console.log("making post about having a new friend")
        super.make({
            title: `${username} and ${request_body.to} are now friends!`,
            owner: username
        });
        super.save();
        super.make({
            title: `${request_body.to} and ${username} are now friends!`,
            owner: request_body.to
        });
        super.save();
        console.log("Saved to database...");
    }
}


module.exports = FriendshipBuilder;