import React from 'react';
import axios from 'axios';
import Modal from '../Common/modal/Modal';
import { getBooksInBookshelf } from '../Library/helper/utils';
import SimpleBook from '../Library/book/simpleBook';
import { getCookie } from '../../helper';


class FavoriteBookModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            favorites: [],
            selected: [],
            head: '',
            instruction: '',
            apiCount: 0
        }
    }

    componentDidMount = () => {
        this.retreiveFavoriteBooks();
        this.getHead();
    }


    retreiveFavoriteBooks = () => {
        if (this.props.func === "add") {
            getBooksInBookshelf("favorites", (data) => {
                this.setState({ favorites: data, active: false })
            }, getCookie("username"))
        } else if (this.props.func === "delete") {
            getBooksInBookshelf("topFavorites", (data) => {
                this.setState({ favorites: data, active: false })
            }, getCookie("username"))
        }

    }
    onClickBook = (book) => {
        let index = this.state.selected.indexOf(book)
        if (index !== -1) {
            // take it out
            this.setState({ selected: this.state.selected.filter(b => b !== book) })
        } else {
            // put it in
            this.setState({ selected: [...this.state.selected, book] })
        }
    }

    handleClose = () => {
        this.setState({ selected: [] })
        this.props.handleClose()
    }

    submitSettings = async () => {
        console.log('submitting', this.state.selected, this.props.func)
        for (var i = 0; i < this.state.selected.length; i++) {
            if (this.props.func === 'add') {
                await this.handleAddBook(this.state.selected[i])
            } else {
                await this.handleRemoveBook(this.state.selected[i])
            }
        }
        this.props.handleClose();
        window.location.reload()
    }

    handleAddBook = async (isbn) => {
        try {
            await axios.post(`/api/library/topfavorites`,
                { isbn: isbn },
                { withCredentials: true })
        } catch (err) {
            console.log(err)
        }
    }

    handleRemoveBook = async (isbn) => {
        console.log(isbn)
        try {
            await axios.put('/api/library/topfavorites',
                { isbn: isbn },
                {
                    withCredentials: true
                })
        } catch (err) {
            console.log(err)
        }
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
        return (
            <Modal
                visible={this.props.visible}
                handleClose={this.handleClose}
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