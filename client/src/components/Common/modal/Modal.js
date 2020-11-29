import React from 'react';
import Modal from 'react-bootstrap/Modal'
import "./Modal.css"

const ModalClass = props => {
    return <div >
        <Modal size="md" show={props.visible} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>{props.heading}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body scrollable>
                {props.children}
            </Modal.Body>
            {props.footer ? <Modal.Footer>
                {props.footer}
            </Modal.Footer> : ""}
        </Modal>
    </div>
}

export default ModalClass