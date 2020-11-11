import React from 'react'
import Book from './book/book'
import './bookshelfLibrary.css'

class BookshelfLibrary extends React.Component {
    state = { books: [] }


    componentDidUpdate(prevProps) {
        if (prevProps.books !== this.props.books) {
            console.log(this.props.name, this.props.books)
            this.setState({ books: this.props.books });
        }

    }

    render() {


        return (<div className="bookshelf-library mx-5 mb-5">
            <h1>{this.props.name}</h1>

            {this.state.books.map(book => (
                <Book
                    isbn={book.isbn}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    img={book.img}
                    key={book.isbn}
                />
            ))}
        </div>)
    }
}

export default BookshelfLibrary