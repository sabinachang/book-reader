import React from 'react';
import Modal from 'react-bootstrap/Modal'
import "./Modal.css"

const ModalClass = props => {
    return <div >
        <Modal size="lg" show={props.visible} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            {props.footer ? <Modal.Footer>
                {props.footer}
            </Modal.Footer> : ""}
        </Modal>
    </div>
}

export default ModalClass