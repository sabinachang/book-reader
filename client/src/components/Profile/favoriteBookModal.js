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
        getBooksInBookshelf("favorites", (data) => {
            this.setState({ favorites: data })
            this.setState({ active: false });
            this.checkLoadingDone()
        })
    }

    onReload = () => {
        window.location.reload()
    }

    onClickBook = () => {
        //TODO: Add books to selected array
        console.log('click')
        // add book.isbn to this.state selected



    }

    submitSettings = () => {
        //TODO: Post favorite books to backend
        console.log('submit');
        axios.post(`/api/topfavorites`, { isbns: this.state.selected }, { withCredentials: true })
            .then((res) => {
                if (res.status === 201) {
                    console.log('finish selected');
                } else {
                    console.log('error');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const visible = this.props.visible;
        const handleClose = this.props.handleClose;
        this.retreiveFavoriteBooks();
        return (
            <Modal
                visible={visible}
                handleClose={handleClose}
                heading="Select your top books">
                <div>
                    <div className="d-flex justify-content-between">
                        <p>Select up to 5 books</p>
                        <span>
                            <button onClick={this.submitSettings} className="btn btn-primary">Submit</button>
                        </span>
                    </div>

                    {this.props.isAuthenticated && this.state.favorites.map(book => (
                        <SimpleBook
                            title={book.title}
                            img={book.thumbnail}
                            onClick={this.onClickBook}
                        />
                    ))}
                </div>
            </Modal>
        )
    }
}

export default FavoriteBookModal