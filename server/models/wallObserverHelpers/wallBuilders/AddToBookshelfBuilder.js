const AbstractBuilder = require('./AbstractWallBuilder')

class AddToBookshelfBuilder extends AbstractBuilder {
    make = () => {
        console.log("making post on wall about adding to bookshelf")
        super.make()
        // Additional logic for Add To Bookshelf functionality.
    }

}


module.exports = AddToBookshelfBuilder;