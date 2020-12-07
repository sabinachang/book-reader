import React, { Component } from 'react';
import "./book.css";

class SimpleBook extends Component {

    render() {
        return(

                <div className="card-full">
                    <div className="card-body">
                    	<h6 className="card-title">{this.state.title}</h6>
                        <span><div className="book" style={{ backgroundImage: this.state.img }}></div></span>
                    </div>
                </div>

        )
    }
    
}

export default SimpleBook;