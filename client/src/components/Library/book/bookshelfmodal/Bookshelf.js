import React from 'react';
import "./bookshelf.css"




class Bookshelf extends React.Component {
    selectBookshelf = () => {
        this.props.onClick(this.props.name)
    }

    render() {
        let className = "";
        if (this.props.selected === this.props.name | this.props.selected === true) {
            className = "selected-border";
        }
        return (
            <div className={className} onClick={this.selectBookshelf}>
                <div className="bookshelf mt-2 px-3 py-2">{this.props.name}</div>
            </div>)
    }
}

export default Bookshelf