import React, { Component } from 'react';
import { Dropdown, Button } from 'react-bootstrap'
import BookshelfModal from './bookshelfmodal/BookshelfModal'
import RecommendModal from './recommendFriends/RecommendModal'
import ProgressModal from './bookProgress/progressModal'
import FeedbackModal from '../../BookFeedback/feedbackModal'
import axios from 'axios';
import "./book.css"


class Book extends Component {
    constructor(props) {
        super(props)
        const img = "url('" + props.img + "')"
        this.state = {
            title: props.title,
            authors: props.authors,
            description: props.description,
            isbn: props.isbn,
            img: img,
            pageCount: props.pageCount,
            bookshelfModal: false,
            recommendModal: false,
            feedbackModal: false,
            progressModal: false,
            page: props.page,
            bookshelf: props.bookshelf
        }

    }

    renderBookshelfModal = () => {
        this.setState({ bookshelfModal: true })
    }

    renderRecommendModal = () => {
        this.setState({ recommendModal: true })
    }

    renderFeedbackModal = () => {
        this.setState({ feedbackModal: true })
    }

    renderProgressModal = () => {
        this.setState({ progressModal: true})
    }

    unrenderBookshelfModal = () => {
        this.setState({ bookshelfModal: false })
    }

    unrenderRecommendModal = () => {
        this.setState({ recommendModal: false })
    }

    unrenderFeedbackfModal = () => {
        this.setState({ feedbackModal: false })
    }
    
    unrenderProgressModal = () => {
        this.setState({ progressModal: false})
    }

    getBookInfo = () => {
        return {
            request_type: "add_book_to_bookshelf",
            title: this.state.title,
            authors: this.state.authors,
            thumbnail: this.props.img,
            description: this.state.description,
            isbn: this.state.isbn,
            pageCount: this.state.pageCount
        }
    }

    handleRemoveBook = () => {
        axios.put(`/api/library/${this.state.bookshelf}`,
            {isbn: this.state.isbn},
            {withCredentials: true
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data.message);
            } else {
                console.log('remove err');
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    removeControl = () => {
        if (this.state.page === 'library') {
            return (
                <div>
                    <Dropdown.Item onClick={this.handleRemoveBook}>Remove From Bookshelf</Dropdown.Item>
                </div>
            );
        }
    }

    progressControl = () => {
        if (this.state.bookshelf === 'Reading') {
            return (
                <div>
                    <Dropdown.Item onClick={this.renderProgressModal}>Track Progress</Dropdown.Item>
                </div>
            );
        }
    }

    getProcessUI = () => {
        if (this.state.bookshelf === 'Reading') {
            return (
                <div>
                    <ProgressModal
                        visible={this.state.progressModal}
                        handleClose={this.unrenderProgressModal}
                        bookInfo={this.getBookInfo()}
                    />           
                </div>
                );     
        }

    }


    render() {
        return (
            <div >
                <BookshelfModal
                    bookInfo={this.getBookInfo()}
                    visible={this.state.bookshelfModal}
                    handleClose={this.unrenderBookshelfModal}
                />

                <RecommendModal
                    visible={this.state.recommendModal}
                    handleClose={this.unrenderRecommendModal}
                    bookInfo={this.getBookInfo()}
                />
                <FeedbackModal
                    visible={this.state.feedbackModal}
                    handleClose={this.unrenderFeedbackfModal}
                    book={this.getBookInfo()}
                    showUserFeedback={this.props.showUserFeedback}>
                </FeedbackModal>

                {this.getProcessUI()}
 
                <Dropdown >
                    <div className="book-info">
                        <div className={this.props.options}>
                            <div className="card-body">
                                <span><div className="book" style={{ backgroundImage: this.state.img }}></div></span>
                                <span className="ml-3">
                                    <h6 className="card-title">{this.state.title}</h6>
                                    <p className="card-text">{this.state.description}</p>
                                    <Button variant='link' onClick={this.renderFeedbackModal}>View reviews</Button>
                                    <Dropdown.Toggle split variant="" id="dropdown-split-basic" className="dropdown-btn" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <Dropdown.Menu className="custom-menu mt-2" id="dropdown-menu-align-right">
                        <Dropdown.Item onClick={this.renderBookshelfModal}>Add To Bookshelf</Dropdown.Item>
                        <Dropdown.Item onClick={this.renderRecommendModal}>Recommend To Friend</Dropdown.Item>
                        {this.removeControl()}
                        {this.progressControl()}
                     
                    </Dropdown.Menu>
                </Dropdown>

            </div>


        );
    }
}
export default Book;