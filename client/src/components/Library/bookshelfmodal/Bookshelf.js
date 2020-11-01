import React from 'react';
import "./bookshelf.css"

const Bookshelf = props => {
    return (
        <div>
            {props.name}
            <div className="bookshelf mt-2 mb-4">
            </div>
        </div>)
}

export default Bookshelf