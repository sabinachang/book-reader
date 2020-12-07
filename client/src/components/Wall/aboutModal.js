import React from 'react';
import Modal from '../Common/modal/Modal'
import axios from 'axios'


class AboutModal extends React.Component {
    render() {
        const visible = this.props.visible;
        const handleClose = this.props.handleClose;
        return (
            <Modal
                visible={visible}
                handleClose={handleClose}
                heading="About">
                <div>
                    <div className="d-flex justify-content-between">
                        <p>Description</p>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default AboutModal