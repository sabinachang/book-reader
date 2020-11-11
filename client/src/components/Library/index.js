import React, { Component } from 'react';
import BookshelfLibrary from './bookshelfLibrary'
import axios from 'axios';


class Library extends Component {
    state = {
        wantToRead: [],
        reading: [],
        read: [],
        favorites: [],
        recommendations: []
    }

    getBookInBookshelf = (bookshelf_name, callback) => {
        axios.get(`http://localhost:5000/api/library/${bookshelf_name}`)
            .then((res) => {
                callback(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount = () => {
        this.getBookInBookshelf("wantToRead", (data) => this.setState({ wantToRead: data }))
        this.getBookInBookshelf("favorites", (data) => this.setState({ favorires: data }))
        this.getBookInBookshelf("reading", (data) => this.setState({ reading: data }))
        this.getBookInBookshelf("read", (data) => this.setState({ read: data }))
        this.getBookInBookshelf("recommendations", (data) => this.setState({ recommendations: data }))
    }


    render() {

        return (
            <div className='fluid-container'>
                <h1 className="mb-4">Library</h1>
                <div className="row text-align-center">
                    <div className="col-12 col-lg-6">
                        <BookshelfLibrary name="Reading" books={this.state.reading} />
                        <BookshelfLibrary name="Want to Read" books={this.state.wantToRead} />
                        <BookshelfLibrary name="Read" books={this.state.read} />
                    </div>
                    <div className="col-12 col-md-5">
                        <BookshelfLibrary name="Recommendations" books={this.state.recommendations} />
                        <BookshelfLibrary name="Favorites" books={this.state.favorites} />
                    </div>




                    <div className="col-9 my-3">

                    </div>

                </div>


            </div>

        );
    }
}
export default Library;