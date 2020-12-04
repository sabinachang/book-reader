import React from 'react';
import Modal from '../Common/modal/Modal'
import Form from './privacySettingForm'
import { getCookie } from '../../helper'
import axios from 'axios'


class PrivacyModal extends React.Component {
    state = {
        whoCanViewProfile: "everybody",
        whoCanLikePosts:'everybody',
        whoCanCommentOnPosts: 'everybody'
    }


    submitSettings = () => {
        const username = getCookie('username')
        axios.post(`http://localhost:5000/api/privacy/${username}`, this.state, { withCredentials: true })
        .then(() => {
            this.props.handleClose()
            alert('Your privacy settings have been successfully saved')
        })

    }
    updateValueViewPosts = (value)=> {
        console.log(value, 'updatevalueviewposts')
        this.setState({whoCanViewProfile: value})
    }
    updateValueLikePosts = (value)=> {
        console.log(value, 'updatevaluelikeposts')
        this.setState({whoCanLikePosts: value})
    }
    updateValueCommentPosts = (value)=> {
        console.log(value, 'updatevaluecommentposts')
        this.setState({whoCanCommentOnPosts: value})
    }

    render() {
        const visible = this.props.visible
        const handleClose = this.props.handleClose
        return (
            
            <Modal
                visible={visible}
                handleClose={handleClose}
                heading="Edit Privacy Settings">
                <div>
                    <Form updateValue={this.updateValueViewPosts} heading="Who can view my posts?"  privacy_type={"whoCanViewProfile"} />
                    <Form updateValue={this.updateValueLikePosts} heading="Who can like my posts?" privacy_type={"whoCanLikePosts"} />
                    <Form updateValue={this.updateValueCommentPosts} heading="Who can comment on my posts?"  privacy_type={"whoCanCommentOnPosts"} />
                </div>
                <div className="d-flex justify-content-end">
                    <button onClick={this.submitSettings} className="btn btn-primary mt-3">Submit Settings</button>

                </div>
            </Modal>
        )
    }
}

export default PrivacyModal