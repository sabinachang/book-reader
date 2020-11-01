import React from 'react';
import Modal from '../../../Common/modal/Modal'

class RecommendModal extends React.Component {

    recommendToFriend = () => {
        this.props.handleClose()

    }
    closeModal = () => {
        this.props.handleClose()
    }

    render() {
        return (<Modal
            visible={this.props.visible}
            handleClose={() => this.closeModal()}
            heading="Which friend are you sending this book to?">

            <div className="text-center">
                <div class="form-group">
                    <label for="exampleFormControlInput1">Friend's Name or Email</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>

            </div>
            <div className="d-flex justify-content-end">
                <button onClick={() => this.recommendToFriend()} className="btn btn-primary">Submit</button>

            </div>
        </Modal>)
    }
}

export default RecommendModal

