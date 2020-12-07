import React, { Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Rating from './rating';
import Message from './message';
import UserReview from './userReview';
import UserRating from './userRating';
import Modal from '../Common/modal/Modal'


class FeedbackModal extends Component {
    constructor(props) {

        super(props);
        this.state = {
            loading: true,
            noBook: false,
            likeCount: 0,
            dislikeCount: 0,
            reviews: [],
        }

        this.callApi = false
        this.hasFavoriteUpdate = false


    }
    closeModal = () => {
        if (this.hasFavoriteUpdate) {
            this.hasFavoriteUpdate = false
            this.props.onReload()
        }

        this.callApi = false
        this.props.handleClose()
    }

    getFeedback = () => {

        axios.get(`/api/feedbacks/${this.props.book.isbn}`,
            { withCredentials: true })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    console.log('set success')
                    this.setState({
                        loading: false,
                        likeCount: res.data.likeCount,
                        dislikeCount: res.data.dislikeCount,
                        reviews: res.data.reviews,
                        noBook: false,
                    })
                } else if (res.status === 205) {
                    this.setState({
                        loading: false,
                        noBook: true,
                        likeCount: 0,
                        dislikeCount: 0,
                        reviews: [],
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidUpdate = () => {
        // console.log('component update')
        if (this.props.visible && !this.callApi) {
            this.callApi = true
            console.log('call api')
            this.setState({
                loading: true,
                noBook: false,
                likeCount: 0,
                dislikeCount: 0,
                reviews: [],
            }, () => {
                this.getFeedback()
            });
        }
    }

    getReviewList = () => {
        console.log('getting review list')
        let reviewsUI;
        if (this.state.reviews.length !== 0) {
            reviewsUI = this.state.reviews.map((r) => {
                return <Message
                    key={r._id}
                    message={r}
                />
            })
        } else {
            reviewsUI = (
                <p>no reviews to show</p>
            )
        }
        return reviewsUI;
    }

    getUserFeedback = () => {
        console.log('getting feedback')
        if (this.props.showUserFeedback) {
            return (
                <>
                    <h5> Your feedback</h5>
                    <UserRating book={this.props.book} notifyUpdate={this.onNotifyUpdate}></UserRating>
                    <UserReview book={this.props.book} notifyUpdate={this.onNotifyUpdate}></UserReview>
                    <hr></hr>
                </>
            )
        } else {
            return null
        }
    }

    onNotifyUpdate = (updateFavorite = false) => {
        this.hasFavoriteUpdate = updateFavorite

        this.setState(prevState => ({
            loading: true,
            ...prevState,
        }))
        this.getFeedback()
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                handleClose={() => this.closeModal()}
                heading={this.props.book.title}>
                <>
                    { this.state.loading ? (
                        <div className="d-flex">
                            <Spinner animation="border" />
                            <div className="loader"></div>
                        </div>
                    ) : (

                            <>
                                { this.state.noBook ? (<div>
                                    <p>This book has not been added to BookReader yet</p>
                                    <p>No ratings and reviews to show</p>
                                </div>) : (
                                        <>
                                            {this.getUserFeedback()}
                                            <h5> All Reviews</h5>
                                            <Rating likeCount={this.state.likeCount}
                                                dislikeCount={this.state.dislikeCount}>
                                            </Rating>
                                            {this.getReviewList()}
                                        </>
                                    )}
                            </>
                        )}
                </>
            </Modal>
        )
    }
}

export default FeedbackModal;