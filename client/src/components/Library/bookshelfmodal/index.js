import React from 'react';
import Modal from '../../Common/modal/Modal'
import BookshelfModalBody from './BookshelfModalBody'

export default (props) => {
    return (<Modal
        visible={props.visible}
        handleClose={props.handleClose}
        heading="Add To Bookshelf">
        <BookshelfModalBody />
    </Modal>)
}