import React, { Component } from 'react';
import Book from './book/Book'
import BookshelfModal from './bookshelfmodal'

class Library extends Component {
    state = {
        bookshelfModal: false,
    }

    renderBookshelfModal = () => {
        this.setState({ bookshelfModal: true })
    }

    unrenderBookshelfModal = () => {
        this.setState({ bookshelfModal: false })
    }


    render() {
        return (
            <div>
                <BookshelfModal
                    visible={this.state.bookshelfModal}
                    handleClose={this.unrenderBookshelfModal}
                />
                <h1 className="mb-4">Library</h1>
                <div className="d-flex justify-content-center">
                    <Book
                        title="Harry Potter"
                        author="J.K. Rowling"
                        img="https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=405&h=540&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpchamber.jpg"
                        onClickAddBookshelf={this.renderBookshelfModal}
                        onClickRecommendFriend={null}
                    />
                </div>

            </div>

        );
    }
}
export default Library;