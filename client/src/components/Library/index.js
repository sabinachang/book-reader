import React, { Component } from 'react';
import Book from './book/Book'
import BookshelfModal from './bookshelfmodal/BookshelfModal'

class Library extends Component {


    render() {
        return (
            <div>
                <h1 className="mb-4">Library</h1>
                <div className="d-flex justify-content-center">
                    <Book
                        title="Harry Potter And The Chamber Of Secrets"
                        author="J.K. Rowling"
                        description="Aenean posuere posuere nisi. Nunc sollicitudin condimentum nunc quis placerat. Donec sagittis nibh eget diam dictum"
                        img="https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=405&h=540&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpchamber.jpg"
                    />
                </div>


            </div>

        );
    }
}
export default Library;