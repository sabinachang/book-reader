import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap'
import $ from 'jquery';
import "./book.css"


class Book extends Component {
    state = { dropdownOpen: false }


    triggerBookshelfPopup = () => {
        console.log("click")
        $('#bookshelfModal').modal('show');
    }

    toggle = () => {
        const opened = this.state.dropdownOpen;
        this.setState({ dropdownOpen: !opened });
    }

    render() {
        return (
            <div>
                <Dropdown >
                    <div className="d-flex">
                        <div className="book">
                        </div>
                        <Dropdown.Toggle split variant="" id="dropdown-split-basic" />

                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => console.log("click")} id="ok-status">Add To Bookshelf</Dropdown.Item>
                        <Dropdown.Item id="help-status">Recommend To Friend</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>


        );
    }
}
export default Book;