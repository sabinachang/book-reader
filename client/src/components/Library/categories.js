import React from 'react'
import Book from './book/book'
import Modal from '../Common/modal/Modal'
import './categories.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faBookmark, faBookReader, faHeart, faUserFriends } from '@fortawesome/free-solid-svg-icons';

class BookshelfLibrary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { books: [], bookshelfModal: false, booksDisplay: ''}
    }


    componentDidUpdate(prevProps) {
        if (prevProps.books !== this.props.books) {
            this.setState({ books: this.props.books});
        }

    }

    componentDidMount() {
        console.log('mount');
        this.setState({booksDisplay: ''});
    }

    renderBookshelfModal = () => {
        this.setState({ bookshelfModal: true })
    }


    unrenderBookshelfModal = () => {
        this.setState({ bookshelfModal: false })
    }

    // handleClickBookshelf = () => {
    //     let bookUI = 
    //             this.state.books.map(book => (
    //                 <Book
    //                     key={book.isbn}
    //                     title={book.title}
    //                     author={book.author}
    //                     description={book.description}
    //                     img={book.thumbnail}
    //                     isbn={book.isbn}
    //                     options="card-half"
    //                 />
    //             ))
    //     this.setState({booksDisplay: bookUI});

    // }

    // booksDisplayUI = () => {
    //     return this.state.booksDisplay
    // }

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

            <div className="bookshelf-library px-3 py-2 mr-2 mb-3"><FontAwesomeIcon icon={icon} className="mr-2"/>{this.props.name}</div>

       
        </div>)
    }
}

export default BookshelfLibrary;

            // <div className="col-9 result-container mb-5">

            //     {this.state.result.map(book => (
            //         <Book
            //             key={book.isbn}
            //             title={book.title}
            //             author={book.author}
            //             description={book.volumeInfo.description}
            //             img={book.thumbnail}
            //             isbn={nook.isbn}
            //             options="card-half"
            //         />
            //     ))}            <div>
            //     {this.booksDisplayUI()}
            // </div>