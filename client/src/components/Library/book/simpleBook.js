import React, { Component } from 'react';
import "./book.css";



class SimpleBook extends Component {
    constructor(props) {
        super(props);
        const img = "url('" + props.img + "')"
        this.state = {
            isbn: props.isbn,
            title: props.title,
            img: img,
            func: props.func,
            style: 'simple-card-body p-3 mt-3'
        }
    }

    onClick = () => {
        if (this.state.style === 'simple-card-body p-3 mt-3') {
            this.setState({ style: 'selected-card-body p-3 mt-3' })
        } else {
            this.setState({ style: 'simple-card-body p-3 mt-3' })
        }
        this.props.onClick(this.state.isbn)

    }


    render() {
        return (
            <div>
                <div className={this.state.style} onClick={this.onClick}>
                    <span><div className="book" style={{ backgroundImage: this.state.img }}></div></span>
                    <span>
                        <p className="simple-card-title mt-2">{this.state.title}</p>
                    </span>
                </div>
            </div>
        )
    }
}

export default SimpleBook;