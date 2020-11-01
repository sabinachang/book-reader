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
            img: img
        }
    }


    render() {
        return (
            <div >
                <Dropdown >
                    <div className="d-flex">
                        <div className="book" style={{ backgroundImage: this.state.img }}>
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