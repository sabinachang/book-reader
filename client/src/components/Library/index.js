import React, { Component } from 'react';
import Book from './book/book'
import Nav1 from '../Common/nav1/Nav1';
import { getBooksInBookshelf } from './helper/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faBookmark, faBookReader, faHeart, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './categories.css'

class Library extends Component {
    state = {
        wantToRead: [],
        reading: [],
        read: [],
        favorites: [],
        recommendations: [],
        booksDisplay: [],
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



    render() {
        return (
            <div>
                <Nav1/>
                <div className="d-flex row justify-content-center mt-4">
                    <div className="col-9">
                        <h4>Your Books</h4>

                        <div className="mt-3">
                        <div onClick={this.handleReading} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                            <FontAwesomeIcon icon={faBookmark} className="mr-2"/>Reading</div>
                        <div onClick={this.handleWantToRead} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                            <FontAwesomeIcon icon={faStream} className="mr-2"/>Want to Read</div>
                        <div onClick={this.handleRead} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                            <FontAwesomeIcon icon={faBookReader} className="mr-2"/>Read</div>
                        <div onClick={this.handleRecommendation} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                            <FontAwesomeIcon icon={faUserFriends} className="mr-2"/>Recommendations</div>
                        <div onClick={this.handleFavroite} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                            <FontAwesomeIcon icon={faHeart} className="mr-2"/>Favorites</div>
                        </div>

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

        );
    }
}
export default Library;