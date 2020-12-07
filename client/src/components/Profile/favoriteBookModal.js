import React from 'react';
import Modal from '../Common/modal/Modal'
import { getBooksInBookshelf } from '../Library/helper/utils'
import Book from '../Library/book/book'
import axios from 'axios'


class FavoriteBookModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            favorites: [],
            selected: [],
        }
        this.apiCount = 0
    }

    checkLoadingDone =  () => {
        this.apiCount ++;
        if (this.apiCount === 5) {
            this.setState({loading: false})
            this.apiCount = 0
        }
    }

    retreiveFavoriteBooks = () => {
        getBooksInBookshelf("favorites", (data) => {
            this.setState({ favorites: data })
            this.checkLoadingDone()
        })
    }

    onReload = () => {
        window.location.reload() 
    }

    handleSelect = () => {
        
    }

    submitSettings = () => {
        //TODO: post favorite books to backend
        console.log('submit');
    }

    render() {
        const visible = this.props.visible;
        const handleClose = this.props.handleClose;
        this.retreiveFavoriteBooks();
        return (
            <Modal
                visible={visible}
                handleClose={handleClose}
                style="overflow-y: scroll; height: 50vh;"
                heading="Select your favorite books">
                <div>
                    <div className="d-flex justify-content-between">
                        <p>Select up to 5 books</p>
                        <span>
                            <button onClick={this.submitSettings} className="btn btn-primary">Submit</button>
                        </span>
                    </div>

                    {this.state.favorites.map(book => (
                        <Book
                            key={book.isbn}
                            title={book.title}
                            author={book.author}
                            description={book.description}
                            img={book.thumbnail}
                            isbn={book.isbn}
                            options="card-full"
                            page='profile'
                            bookshelf={this.state.selectedShelf}
                            pageCount={book.pageCount}
                            showUserFeedback={true}
                            onReload={this.onReload}
                            onClick={this.handleSelect}
                        />
                    ))} 
                </div>
            </Modal>
        )
    }
}

export default FavoriteBookModal