import React from 'react';
import Modal from '../Common/modal/Modal'
import { getBooksInBookshelf } from '../Library/helper/utils'
import Book from '../Library/book/book'
import SimpleBook from '../Library/book/simpleBook'
import axios from 'axios'


class FavoriteBookModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            favorites: [],
            selected: [],
            head: '',
            instruction: ''
        }
        this.apiCount = 0;
    }

    checkLoadingDone = () => {
        this.apiCount++;
        if (this.apiCount === 5) {
            this.setState({ loading: false })
            this.apiCount = 0
        }
    }

    retreiveFavoriteBooks = () => {
        if (this.props.func === "add") {
            getBooksInBookshelf("favorites", (data) => {
                this.setState({ favorites: data })
                this.setState({ active: false });
                this.checkLoadingDone()
            })
        } else if (this.props.func === "delete") {
            getBooksInBookshelf("topFavorites", (data) => {
                this.setState({ favorites: data })
                this.setState({ active: false });
                this.checkLoadingDone()
            })        
        }

    }

    onReload = () => {
        window.location.reload()
    }

    onClickBook = () => {
        console.log('click');
    }

    submitSettings = () => {
        this.props.handleClose();
    }

    getHead = () => {
        if (this.props.func === "add"){
            this.head = "Add your top books";
            this.instruction = "Click the book to add to your top books";
        } else {
            this.head = "Your current top books";
            this.instruction = "Click the book to remove from your top books";
        }
        
    }

    render() {
        const visible = this.props.visible;
        const handleClose = this.props.handleClose;
        this.retreiveFavoriteBooks();
        this.getHead();
        return (
            <Modal
                visible={visible}
                handleClose={handleClose}
                heading={this.head}>
                <div>
                    <div className="d-flex justify-content-between">
                        <p>{this.instruction}</p>
                        <span>
                            <button onClick={this.submitSettings} className="btn btn-primary">Finish</button>
                        </span>
                    </div>

                    {this.props.isAuthenticated && this.state.favorites.map(book => (
         
                        <SimpleBook
                            key={book.isbn}
                            isbn={book.isbn}
                            title={book.title}
                            img={book.thumbnail}
                            func={this.props.func}
                            onClick={this.onClickBook}
                        />
  
                    ))}
                </div>
            </Modal>
        )
    }
}

export default FavoriteBookModal