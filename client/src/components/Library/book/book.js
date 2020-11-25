import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap'
import axios from 'axios';
import BookshelfModal from './bookshelfmodal/BookshelfModal'
import RecommendModal from './recommendFriends/RecommendModal'
import "./Book.css"

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
            bookshelf: 'read', //TODO: how to get bookshelf in library page
        }
    }

    renderBookshelfModal = () => {
        this.setState({ bookshelfModal: true })
    }

    renderRecommendModal = () => {
        this.setState({ recommendModal: true })
    }

    unrenderBookshelfModal = () => {
        this.setState({ bookshelfModal: false })
    }

    unrenderRecommendModal = () => {
        this.setState({ recommendModal: false })
    }

    getBookInfo = () => {
        return {
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
            {
            isbn: this.state.isbn
            },
            {withCredentials: true
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data.message);
            } else {
                console.log('errrr');
            }
        }).catch((err) => {
            console.log(err);
        })

    }
    //TODO: checkProgressModal
    handleCheckProgress = () => {
        axios.put('/api/progress', {
            isbn: this.state.isbn,
            pageNum: 10  // TODO: input box from user
            },
            {withCredentials: true}
        ).then ((res) => {
            if (res.status === 200) {
                console.log(res.data.message);
            } else {
                console.log(res.error);
            }
   
        }).catch ((err) => {
            console.log(err);
        });
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

                <Dropdown >
                    <div className="d-flex book-info">
                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.title}</h5>
                                <div className="book my-4" style={{ backgroundImage: this.state.img }}></div>
                                <p className="card-text">{this.state.description}</p>
                            </div>

                        </div>


                        <Dropdown.Toggle split variant="" id="dropdown-split-basic" />

                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.renderBookshelfModal}>Add To Bookshelf</Dropdown.Item>
                        <Dropdown.Item onClick={this.renderRecommendModal}>Recommend To Friend</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleRemoveBook}>Remove From Bookshelf</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleCheckProgress}>Track Progress</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>


        );
    }
}
export default Book;