import React from 'react';
import Modal from '../Common/modal/Modal'
import { getBooksInBookshelf } from '../Library/helper/utils'
import SimpleBook from '../Library/book/simpleBook'
import { getCookie } from '../../helper'


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

    componentDidMount = () => {
        this.retreiveFavoriteBooks();
        this.getHead();
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
            }, getCookie("username"))
        }

    }
    onClickBook = (book) => {
        console.log(book)
    }

    submitSettings = () => {
        this.props.handleClose();
    }

    getHead = () => {
        if (this.props.func === "add") {
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
        return (
            <Modal
                visible={visible}
                handleClose={handleClose}
                heading={this.head}>
                <div>
                    <div className="d-flex justify-content-between">
                        <p>{this.instruction}</p>
                        <span>
                            <button onClick={this.submitSettings} className="btn btn-primary">Submit</button>
                        </span>
                    </div>

                    {this.state.favorites.map(book => (

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