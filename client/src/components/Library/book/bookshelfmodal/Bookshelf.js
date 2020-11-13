import React from 'react';
import "./bookshelf.css"
import { mapBookshelfToImg } from '../../helper/utils'




class Bookshelf extends React.Component {
    selectBookshelf = () => {
        this.props.onClick(this.props.name)
    }

    render() {
        var className = "";
        if (this.props.selected === this.props.name | this.props.selected === true) {
            className = "selected-border";
        }
        return (
            <div className={className} onClick={this.selectBookshelf}>
                {this.props.name}
                <div className="bookshelf mt-2 mb-4" style={{ backgroundImage: mapBookshelfToImg(this.props.name) }} >
                </div>
            </div>)
    }
}

export default Bookshelf