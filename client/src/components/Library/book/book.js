import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap'
import "./Book.css"

class Book extends Component {
    constructor(props) {
        super(props)
        const img = "url(" + props.img + ")"
        this.state = {
            title: props.title,
            author: props.author,
            description: props.description,
            img: img,
            bookshelfModal: false,
        }
    }

    renderBookshelfModal = () => {
        this.setState({ bookshelfModal: true })
    }

    unrenderBookshelfModal = () => {
        this.setState({ bookshelfModal: false })
    }

    getBookInfo = () => {
        return {
            title: this.state.title,
            author: this.state.author,
        }
    }

    render() {
        return (
            <div>
                <BookshelfModal
                    bookInfo={this.getBookInfo()}
                    visible={this.state.bookshelfModal}
                    handleClose={this.unrenderBookshelfModal}
                />
                <Dropdown >
                    <div className="d-flex book-info">
                        <div class="card" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">{this.state.title}</h5>
                                <p class="card-text">{this.state.description}</p>
                            </div>
                            <div class="card-body">
                                <div className="book" style={{ backgroundImage: this.state.img }}></div>
                            </div>
                        </div>


                        <Dropdown.Toggle split variant="" id="dropdown-split-basic" />

                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.props.onClickAddBookshelf}>Add To Bookshelf</Dropdown.Item>
                        <Dropdown.Item onClick={this.props.onClickRecommendFriend}>Recommend To Friend</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>


        );
    }
}
export default Book;