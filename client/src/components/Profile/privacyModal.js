import React from 'react';
import Modal from '../Common/modal/Modal'
import Form from './privacySettingForm'
import { getCookie } from '../../helper'

class PrivacyModal extends React.Component {

    render() {
        return (
            <Modal
                visible={this.props.visible}
                handleClose={this.props.handleClose}
                heading="Edit Privacy Settings">
                <div>
                    <Form heading="Who can view my posts?" route={`/api/privacy`} privacy_type={"whoCanViewProfile"} />
                    <br></br>
                    <Form heading="Who can like my posts?" route={`/api/privacy`} privacy_type={"whoCanLikePosts"} />
                    <br></br>
                    <Form heading="Who can comment on my posts?" route={`/api/privacy`} privacy_type={"whoCanCommentOnPosts"} />
                </div>
                <div className="d-flex justify-content-end">
                    <button onClick={null} className="btn btn-primary mt-3">Submit Settings</button>

                </div>
            </Modal>
        )
    }
}

export default PrivacyModal