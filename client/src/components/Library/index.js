import React, { Component } from 'react';
import Book from './book/book'
import Nav1 from '../Common/nav1/Nav1';
import { getBooksInBookshelf } from './helper/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faBookmark, faBookReader, faHeart, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './categories.css'

// import socketClient from 'socket.io-client'

class Library extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            wantToRead: [],
            reading: [],
            read: [],
            favorites: [],
            recommendations: [],
            booksDisplay: [],
        }
        // this.socket = socketClient('/')
        // this.socket.on('fetchFavorite', () => {
        //     getBooksInBookshelf("favorites", (data) => this.setState({ favorites: data }))
        // })
    }
  

    componentDidMount = () => {
        getBooksInBookshelf("wantToRead", (data) => this.setState({ wantToRead: data }))
        getBooksInBookshelf("favorites", (data) => this.setState({ favorites: data }))
        getBooksInBookshelf("reading", (data) => this.setState({ reading: data }))
        getBooksInBookshelf("read", (data) => this.setState({ read: data }))
        getBooksInBookshelf("recommendations", (data) => this.setState({ recommendations: data }))
    }

    handleReading = () => {
        this.setState({booksDisplay: this.state.reading})
    }

    handleWantToRead = () => {
        this.setState({booksDisplay: this.state.wantToRead})
    }

    handleRead = () => {
        this.setState({booksDisplay: this.state.read})
    }

    handleRecommendation = () => {
        this.setState({booksDisplay: this.state.recommendations})
    }

    handleFavroite = () => {
        this.setState({booksDisplay: this.state.favorites})
    }



    componentWillUnmount = () => {
        // this.socket.disconnect()
    }
    render() {
        return (
            <div>
                <Nav1/>
                <div className="d-flex row justify-content-center mt-4 mb-6">
                    <div className="col-9">
                        <h4>Your Books</h4>

                        <div className="mt-3">
                            <span onClick={this.handleReading} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                                <FontAwesomeIcon icon={faBookmark} className="mr-2"/>Reading</span>
                            <span onClick={this.handleWantToRead} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                                <FontAwesomeIcon icon={faStream} className="mr-2"/>Want to Read</span>
                            <span onClick={this.handleRead} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                                <FontAwesomeIcon icon={faBookReader} className="mr-2"/>Read</span>
                            <span onClick={this.handleRecommendation} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                                <FontAwesomeIcon icon={faUserFriends} className="mr-2"/>Recommendations</span>
                            <span onClick={this.handleFavroite} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                                <FontAwesomeIcon icon={faHeart} className="mr-2"/>Favorites</span>
                        </div>

                        <div>
                            {this.state.booksDisplay.map(book => (
                                <Book
                                    key={book.isbn}
                                    title={book.title}
                                    author={book.author}
                                    description={book.description}
                                    img={book.thumbnail}
                                    isbn={book.isbn}
                                    options="card-half"
                                />
                            ))}  
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Library;