import React from 'react';
import "./bookshelf.css"




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
                <div className="bookshelf mt-2 mb-4">
                </div>
            </div>)
    }
}

export default Bookshelf