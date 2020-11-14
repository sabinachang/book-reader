import React from 'react';
import "./bookshelf.css"
import { mapBookshelfToImg } from '../../helper/utils'




class Bookshelf extends React.Component {
    selectBookshelf = () => {
        this.props.onClick(this.props.name)
    }

    renderBookshelf = () => {
        if (this.props.excludeBookshelf !== this.props.name) {
            var className = "";
        if (this.props.selected === this.props.name | this.props.selected === true) {
            className = "selected-border";
        }
        return (
            <div className={className} onClick={this.selectBookshelf}>
                <h4>{this.props.name} </h4>
                <div className="bookshelf mt-2 mb-4" style={{ backgroundImage: mapBookshelfToImg(this.props.name) }} >
                </div>
            </div>)
             }
        else {
            return (
            <div className="unselectable-bookshelf">
                <h4>{this.props.name} </h4>
                This book is already in the {this.props.name} bookshelf
                <div className="bookshelf mt-2 mb-4" style={{ backgroundImage: mapBookshelfToImg(this.props.name) }} >
                </div>
            </div>)
        }
    }

    render() {
        
        return this.renderBookshelf()
    }
}

export default Bookshelf