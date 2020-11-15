import React, { Component } from 'react';
import BookshelfLibrary from './bookshelfLibrary'
import { getBooksInBookshelf } from './helper/utils'

class Library extends Component {
    state = {
        wantToRead: [],
        reading: [],
        read: [],
        favorites: [],
        recommendations: []
    }


    componentDidMount = () => {
        getBooksInBookshelf("wantToRead", (data) => this.setState({ wantToRead: data }))
        getBooksInBookshelf("favorites", (data) => this.setState({ favorites: data }))
        getBooksInBookshelf("reading", (data) => this.setState({ reading: data }))
        getBooksInBookshelf("read", (data) => this.setState({ read: data }))
        getBooksInBookshelf("recommendations", (data) => this.setState({ recommendations: data }))
    }


    render() {

        return (
            <div className='fluid-container'>
                <h1 className="mb-4">Library</h1>
                <div className="d-flex justify-content-around">
                    <BookshelfLibrary name="Reading" books={this.state.reading} />
                    <BookshelfLibrary name="Want to Read" books={this.state.wantToRead} />
                    <BookshelfLibrary name="Read" books={this.state.read} />
                </div>
                <div className="my-5"></div>
                <div className="d-flex justify-content-between">
                    <BookshelfLibrary name="Recommendations" books={this.state.recommendations} />
                    <BookshelfLibrary name="Favorites" books={this.state.favorites} />
                </div>

            </div>

        );
    }
}
export default Library;