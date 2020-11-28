import React from 'react';
import Modal from '../../../Common/modal/Modal'
import Bookshelf from './Bookshelf'
import axios from 'axios';

class BookshelfModal extends React.Component {
    state = { selected: null, favorites: false }

    addToBookshelf = async () => {
        if (this.state.selected) {
            await axios.post(`http://localhost:5000/api/library/${this.state.selected.replace(/\s+/g, '')}`, this.props.bookInfo)
                .then(() => { console.log('DONE SELECTED') })
        }
        if (this.state.favorites) {
            await axios.post(`http://localhost:5000/api/library/favorites`, this.props.bookInfo)
                .then(() => { console.log('DONE FAVORITES') })
        }

        if (this.state.favorites || this.state.selected) {
            this.setState({ selected: null, favorites: false })
            this.props.handleClose()
        }


    }
    selectBookshelf = bookshelf => {
        switch (bookshelf) {
            case "Want to Read":
                if (this.state.selected === 'Want to Read') {
                    this.setState({ selected: null })
                } else {
                    this.setState({ selected: bookshelf });
                } break;
            case "Reading":
                if (this.state.selected === 'Reading') {
                    this.setState({ selected: null })
                } else {
                    this.setState({ selected: bookshelf });
                } break;
            case "Read":
                if (this.state.selected === 'Read') {
                    this.setState({ selected: null })
                } else {
                    this.setState({ selected: bookshelf });
                } break;
            case "Favorites":
                const favorites = this.state.favorites;
                this.setState({ favorites: !favorites })
                break;
            default:
                throw new Error("Invalid Bookshelf")
        }

    }

    closeModal = () => {
        this.setState({ favorites: false, selected: null })
        this.props.handleClose()
    }

    render() {
        return (
        <Modal
            visible={this.props.visible}
            handleClose={() => this.closeModal()}
            heading="Which Bookshelf are you adding this book to?"
        >

            <div className="row text-center">
                <div className="col">
                    {/* Add click handler to bookshelf to dd this book to the bookshelf */}
                    <Bookshelf selected={this.state.selected} onClick={this.selectBookshelf} name="Want to Read" icons="faStream"/>
                    <Bookshelf selected={this.state.selected} onClick={this.selectBookshelf} name="Reading" icons="faBookmark"/>
                    <Bookshelf selected={this.state.selected} onClick={this.selectBookshelf} name="Read" icons="faBookReader"/>
                    <Bookshelf selected={this.state.favorites} onClick={this.selectBookshelf} name="Favorites" icons="faHeart"/>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={() => this.addToBookshelf()} className="btn btn-primary mt-3">Submit</button>

            </div>
        </Modal>)
    }
}

export default BookshelfModal

