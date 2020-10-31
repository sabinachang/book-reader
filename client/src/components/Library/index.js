import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './book/book'

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