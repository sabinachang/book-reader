import React from 'react';
import Modal from '../../../Common/modal/Modal'
import Bookshelf from './Bookshelf'

class BookshelfModal extends React.Component {
    state = { selected: null, favorites: false }

    addToBookshelf = () => {
        if (this.state.selected || this.state.favorites) {
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
            case "Currently Reading":
                if (this.state.selected === 'Currently Reading') {
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
                throw "Invalid Bookshelf"
        }

    }

    closeModal = () => {
        this.setState({ favorites: false, selected: null })
        this.props.handleClose()
    }

    render() {
        return (<Modal
            visible={this.props.visible}
            handleClose={() => this.closeModal()}
            heading="Which Bookshelf are you adding this book to?">

            <div className="row text-center">
                <div className="col">
                    {/* Add click handler to bookshelf to dd this book to the bookshelf */}
                    <Bookshelf selected={this.state.selected} onClick={this.selectBookshelf} name="Want to Read" />
                    <Bookshelf selected={this.state.selected} onClick={this.selectBookshelf} name="Currently Reading" />

                </div>
                <div className="col">
                    <Bookshelf selected={this.state.selected} onClick={this.selectBookshelf} name="Read" />
                    <Bookshelf selected={this.state.favorites} onClick={this.selectBookshelf} name="Favorites" />
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={() => this.addToBookshelf()} className="btn btn-primary">Submit</button>

            </div>
        </Modal>)
    }
}

export default BookshelfModal

