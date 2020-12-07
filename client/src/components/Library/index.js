import React, { Component } from 'react';
import Book from './book/book'
import NoPost from '../Wall/nopost';
import Nav1 from '../Common/nav1/Nav1';
import { getBooksInBookshelf } from './helper/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faBookmark, faBookReader, faHeart, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './categories.css'

class Library extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            selectedShelf: 'Reading',
            wantToRead: [],
            reading: [],
            read: [],
            favorites: [],
            recommendations: [],
            booksDisplay: [],
        }
        this.apiCount = 0
    }

    checkLoadingDone = (data) => {
        if (data.message && data.message.includes("401")) {
            this.apiCount = 5
            this.setState({ loading: "unauthenticated" })
        } else {
            this.apiCount++;
            if (this.apiCount === 5) {
                this.setState({ loading: "done" })
                this.apiCount = 0
            }
        }
    }
    componentDidMount = () => {
        getBooksInBookshelf("wantToRead", (data) => {
            this.setState({ wantToRead: data })
            this.checkLoadingDone(data)
        })

        getBooksInBookshelf("favorites", (data) => {
            this.setState({ favorites: data })
            this.checkLoadingDone(data)
        })

        getBooksInBookshelf("reading", (data) => {
            console.log("DATA!!", data)
            this.setState({ reading: data })
            this.checkLoadingDone(data)
        })

        getBooksInBookshelf("read", (data) => {
            this.setState({ read: data })
            this.checkLoadingDone(data)
        })

        getBooksInBookshelf("recommendations", (data) => {
            this.setState({ recommendations: data })
            this.checkLoadingDone(data)
        })

    }


    handleReading = () => {
        this.setState({ booksDisplay: this.state.reading, selectedShelf: 'Reading' })
    }

    handleWantToRead = () => {
        this.setState({ booksDisplay: this.state.wantToRead, selectedShelf: 'WantToRead' })
    }

    handleRead = () => {
        this.setState({ booksDisplay: this.state.read, selectedShelf: 'Read' })
    }

    handleRecommendation = () => {
        this.setState({ booksDisplay: this.state.recommendations, selectedShelf: 'Recommendations' })
    }

    handleFavroite = () => {
        this.setState({ booksDisplay: this.state.favorites, selectedShelf: 'Favorites' })
    }

    onReload = () => {
        window.location.reload()
    }


    render() {
        return (
            <div>
                <Nav1 />
                <div className="d-flex row justify-content-center mt-4 mb-6">

                    <div className="col-9 mb-5">
                        <h4>Your Books</h4>
                        {this.state.loading === "loading" ? <div className="loader"></div> :
                            this.state.loading === "unauthenticated" ? <NoPost isLoggedIn={false} text={"Please login to see your library. Click here to login or register."} /> :
                                (
                                    <>
                                        <div className="mt-3">
                                            <span onClick={this.handleReading} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                                                <FontAwesomeIcon icon={faBookmark} className="mr-2" />Reading</span>
                                            <span onClick={this.handleWantToRead} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                                                <FontAwesomeIcon icon={faStream} className="mr-2" />Want to Read</span>
                                            <span onClick={this.handleRead} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                                                <FontAwesomeIcon icon={faBookReader} className="mr-2" />Read</span>
                                            <span onClick={this.handleRecommendation} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                                                <FontAwesomeIcon icon={faUserFriends} className="mr-2" />Recommendations</span>
                                            <span onClick={this.handleFavroite} className="bookshelf-library px-3 py-2 mr-2 mb-3">
                                                <FontAwesomeIcon icon={faHeart} className="mr-2" />Favorites</span>
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
                                                    page='library'
                                                    bookshelf={this.state.selectedShelf}
                                                    pageCount={book.pageCount}
                                                    showUserFeedback={true}
                                                    onReload={this.onReload}
                                                />
                                            ))}
                                        </div>

                                    </>
                                )}
                    </div>

                </div>
            </div>

        );
    }
}
export default Library;