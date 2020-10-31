import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./book.css" 

class Book extends Component {
    constructor(props) {
        super(props);
      }



    render() {
     

        return (
            <div className="book" role="button" data-toggle="dropdown"
                              aria-haspopup="true" aria-expanded="false">
             <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            {/* Add click handlet to Add to Bookshelf */}
                            {/* Popup that displays all of the bookshelf */}
                          <p className="dropdown-item status" id="ok-status">Add To Bookshelf</p>
                          <p className="dropdown-item status" id="help-status">Recommend To Friend</p>
                        </div>
            </div>

        );
    }
}
export default Book;