import React from 'react'
import Book from './book/book'
import Modal from '../Common/modal/Modal'
import './categories.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faBookmark, faBookReader, faHeart, faUserFriends } from '@fortawesome/free-solid-svg-icons';

class BookshelfLibrary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { books: [], bookshelfModal: false }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.books !== this.props.books) {
            this.setState({ books: this.props.books });
        }
    }

    renderBookshelfModal = () => {
        this.setState({ bookshelfModal: true })
    }


    unrenderBookshelfModal = () => {
        this.setState({ bookshelfModal: false })
    }

    toggleBookshelfModal = (visible) => {
        this.setState({ bookshelfModal: visible })
    }

    render() {
        let icon;
        switch (this.props.icons) {
            case "1":
                icon = faBookmark;
                break;
            case "2":
                icon = faStream;
                break;
            case "3":
                icon = faBookReader;
                break;
            case "4":
                icon = faUserFriends;
                break;
            case "5":
                icon = faHeart;
                break;
            default:
                break;
        }

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
                            authors={book.author}
                            description={book.description}
                            img={book.thumbnail}
                            key={book.isbn}
                            options="card-full"
                            showUserFeedback={true}
                        />
                    ))}
                </div>
            </Modal>
            <div onClick={this.renderBookshelfModal} className="bookshelf-library px-3 py-2 mr-2 mb-3"><FontAwesomeIcon icon={icon} className="mr-2" />{this.props.name}</div>
        </div>)
    }
}

export default BookshelfLibrary;