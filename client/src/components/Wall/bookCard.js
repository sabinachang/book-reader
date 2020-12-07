import React, { Component } from 'react';
import './bookCard.css';


class FavoriteBook extends Component {
    constructor(props){
        super(props)
        const img = "url('" + props.img + "')";
        this.state = {
            title: props.title,
            img: img,
        }
    }
    
    render() {
        return (
        <div className="book-wrapper-special">
            <div className="book-card p-3 mb-4 mt-3">
                <div className="special-card" style={{ backgroundImage: this.state.img }}></div>
                <p className="text-center mt-2">{this.state.title}</p>
            </div>
        </div>
        );
    }
}
export default FavoriteBook;