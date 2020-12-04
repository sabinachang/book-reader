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
            loading: false,
        }
    }

    closeModal = () => {
        this.setState ({
            showResult: false,
            result: {},
            loading: false,
        }, () => {
            this.props.handleClose()
        });
    }

    recommendBook = (data) => {
        this.setState(prevState => ({
            ...prevState,
            loading: true,
        }))
        axios.post('/api/request/recommendBook', {
            title: this.props.bookInfo.title,
            authors: this.props.bookInfo.authors,
            thumbnail: this.props.bookInfo.thumbnail,
            description: this.props.bookInfo.description,
            isbn: this.props.bookInfo.isbn,
            pageCount: this.props.bookInfo.pageCount,
            to: data.friendId,
        }).then ((res) => {
            this.setState({
                showResult: true,
                result: res.data,
                loading: false,
            })
        }).catch ((err) => {
            console.log(err);
        });
    }

    getContentUI = () => {
        if (this.state.loading) {
            return <p>Processing recommendation...</p>
        }

        if (this.state.showResult === true) {
            return <p>{this.state.result.message}</p>
        } else {
            return <FriendList
            bookTitle={this.props.bookInfo.title}
            recommendBook={this.recommendBook}/>
        }
    }

    render() {
            const heading = (this.state.showResult) ? this.state.result.status: "Which friend are you sending this book to?"
            const contentUI = this.getContentUI();
            return (<Modal
            visible={this.props.visible}
            handleClose={() => this.closeModal()}
            heading={heading}>
            { contentUI}    
        </Modal>)
    }
}

export default RecommendModal

