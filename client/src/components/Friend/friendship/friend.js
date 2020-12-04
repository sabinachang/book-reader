import React, { Component } from 'react';
import './candidate.css';


class Friend extends Component {

    render() {
        return(
            <div className='custom-myfriend mb-2'>
                <div className="d-flex justify-content-between px-3 py-2">
                    <h6 className="mt-1">{this.props.username}</h6>
                </div>
            </div>
        )
    }
    
}

export default Friend;