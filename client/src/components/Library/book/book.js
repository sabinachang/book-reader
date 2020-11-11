import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap'
import BookshelfModal from './bookshelfmodal/BookshelfModal'
import RecommendModal from './recommendFriends/RecommendModal'
import "./book.css"

class Book extends Component {
    constructor(props) {
        super(props)
        const img = "url(" + props.img + ")"
        this.state = {
            title: props.title,
            author: props.author,
            description: props.description,
            isbn: props.isbn,
            img: img,
            bookshelfModal: false,
            recommendModal: false
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
            author: this.state.author,
            thumbnail: this.state.img,
            description: this.state.description,
            isbn: this.state.isbn
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

                <Dropdown >
                    <div className="d-flex book-info">
                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.title}</h5>
                                <div className="book my-4" style={{ backgroundImage: this.state.img}}></div>
                                <p className="card-text">{this.state.description}</p>
                            </div>

                        </div>


                        <Dropdown.Toggle split variant="" id="dropdown-split-basic" />

                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.renderBookshelfModal}>Add To Bookshelf</Dropdown.Item>
                        <Dropdown.Item onClick={this.renderRecommendModal}>Recommend To Friend</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>


        );
    }
}
export default Book;