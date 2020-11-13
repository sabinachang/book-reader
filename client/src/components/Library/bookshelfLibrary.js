import React from 'react'
import Book from './book/book'
import Modal from '../Common/modal/Modal'
import { mapBookshelfToImg } from './helper/utils'
import './bookshelfLibrary.css'

class BookshelfLibrary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { books: [], bookshelfModal: false }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.books !== this.props.books) {
            console.log(this.props.name, this.props.books)
            this.setState({ books: this.props.books });
        }

    }

    renderBookshelfModal = () => {
        this.setState({ bookshelfModal: true })
    }


    unrenderBookshelfModal = () => {
        this.setState({ bookshelfModal: false })
    }


    render() {
        return (<div>
            <Modal
                visible={this.state.bookshelfModal}
                handleClose={() => this.unrenderBookshelfModal()}
                heading={this.props.name}>
                <div className="book-results">
                    {this.state.books.map(book => (
                        <Book
                            isbn={book.isbn}
                            title={book.title}
                            author={book.author}
                            description={book.description}
                            img={book.thumbnail}
                            key={book.isbn}
                        />
                    ))}
                </div>

            </Modal>
            <h1>{this.props.name}</h1>

            <div onClick={this.renderBookshelfModal} style={{ backgroundImage: mapBookshelfToImg(this.props.name) }}
                className="bookshelf-library">

            </div>

        </div>)
    }
}

export default BookshelfLibrary