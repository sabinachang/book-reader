import React from 'react';
import Modal from '../../Common/modal/Modal'
import BookshelfBody from './BookshelfBody'

const BookshelfModal = props => {
    return (<Modal
        visible={props.visible}
        handleClose={props.handleClose}
        heading="Which Bookshelf are you adding this book to?">
        <BookshelfBody />
    </Modal>)
}

export default BookshelfModal

