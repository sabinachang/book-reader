import React from 'react';
import Modal from '../../../Common/modal/Modal'
import FriendList from './friendList';

class RecommendModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showResult: false,
            result: {},
        }
    }

    closeModal = () => {
        this.setState ({
            showResult: false,
            result: {},
        }, () => {
            this.props.handleClose()

        });
    }

    recommendBook = (data) => {
        //TODO call recommend api 
        console.log('recommend ' + data.title + ' to ' + data.friendId);

        this.setState({
            showResult: true, 
            result: {
                status: 'success',
                message: 'ok! book has been recommended'
            }
        });
    }

    render() {
            const heading = (this.state.showResult) ? this.state.result.status: "Which friend are you sending this book to?"
            return (<Modal
            visible={this.props.visible}
            handleClose={() => this.closeModal()}
            heading={heading}>
            
            {this.state.showResult === true ? ( 
                <p>{this.state.result.message}</p>
            ): ( <FriendList
                bookTitle={this.props.bookTitle}
                recommendBook={this.recommendBook}/>) }
           

        </Modal>)
    }
}

export default RecommendModal

