import React from 'react';
import axios from 'axios';
import Modal from '../Common/modal/Modal';
import { getBooksInBookshelf } from '../Library/helper/utils';
import SimpleBook from '../Library/book/simpleBook';
import { getCookie } from '../../helper';


class FavoriteBookModal extends React.Component {
    constructor(props) {
        super(props);
        if (props.func === "add") {
            var head = "Add your top books";
            var instruction = "Click on books from your favorites bookshelf, and click 'submit' to display them on your profile!";
        } else {
            var head = "Your current top books";
            var instruction = "Click on books from your profile display page, and click 'submit' to remove them from your profile!";
        }
        this.state = {
            loading: true,
            favorites: [],
            selected: [],
            head: head,
            instruction: instruction,
            apiCount: 0
        }
    }

    componentDidMount = () => {
        this.retreiveFavoriteBooks();
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

    render() {
        return (
            <Modal
                visible={this.props.visible}
                handleClose={this.handleClose}
                heading={this.state.head}>
                <div>
                    <div className="d-flex justify-content-center">
                        <h6>{this.state.instruction}</h6>
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
\                <div>
                    <button onClick={this.submitSettings} className="btn btn-primary">Submit</button>
                </div>
            </Modal>
        )
    }
}

export default FavoriteBookModal