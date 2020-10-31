import React, { Component } from 'react';
import Book from './book/book'
import './book/book.css'

class Library extends Component {
    render() {
        return (
            <div>
                <h1>Library</h1>
                <Book />
            </div>

        );
    }
}
export default Library;