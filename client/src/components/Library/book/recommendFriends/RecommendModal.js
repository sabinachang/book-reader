import React from 'react';
import Modal from '../../../Common/modal/Modal'
import FriendList from './friendList';
import axios from 'axios';

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

        axios.post('/api/request/recommendBook', {
            title: this.props.bookInfo.title,
            author: this.props.bookInfo.author,
            // TODO remove url()
            thumbnail: this.props.bookInfo.thumbnail,
            description: this.props.bookInfo.description,
            isbn: this.props.bookInfo.isbn,
            to: data.friendId,
        }).then ((res) => {
            this.setState({
                showResult: true,
                result: res.data,
            })
        }).catch ((err) => {
            console.log(err);
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
                bookTitle={this.props.bookInfo.title}
                recommendBook={this.recommendBook}/>) }
           

        </Modal>)
    }
}

export default RecommendModal

