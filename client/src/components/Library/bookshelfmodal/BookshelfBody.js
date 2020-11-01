import React from 'react';
import Bookshelf from './Bookshelf'

const BookshelfBody = () => {
    return (<div>
        <div className="row text-center">
            <div className="col">
                {/* Add click handler to bookshelf to dd this book to the bookshelf */}
                <Bookshelf name="Want to Read" />
                <Bookshelf name="Currently Reading" />

            </div>
            <div className="col">
                <Bookshelf name="Read" />
                <Bookshelf name="Favorites" />
            </div>
        </div>
    </div>
    )
}

export default BookshelfBody