import React, { Component } from 'react';
import Book from './book/book'
import Nav1 from '../Common/nav1/Nav1';
import Categories from './categories'
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
            <div>
                <Nav1/>
                <div className="d-flex row justify-content-center mt-4">
                    <div className="col-9">
                        <h4>Your Books</h4>
                        <div className="mt-3">
                            <Categories name="Reading" books={this.state.reading} icons = "1" />
                            <Categories name="Want to Read" books={this.state.wantToRead} icons = "2"/>
                            <Categories name="Read" books={this.state.read} icons = "3"/>
                            <Categories name="Recommendations" books={this.state.recommendations} icons = "4"/>
                            <Categories name="Favorites" books={this.state.favorites} icons = "5"/>
                        </div>
                        <Book
                            title="Harry Potter And The Chamber Of Secrets"
                            author="J.K. Rowling"
                            description="Aenean posuere posuere nisi. Nunc sollicitudin condimentum nunc quis placerat. Donec sagittis nibh eget diam dictum"
                            img="https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=405&h=540&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpchamber.jpg"
                            isbn="IDK"
                            options="card-half"
                        />
                        
                    </div>
                    <div className="col-9 my-3">
                    </div>
                </div>
            </div>

        );
    }
}
export default Library;