import React from 'react';
import "./bookshelf.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faBookmark, faBookReader, faHeart } from '@fortawesome/free-solid-svg-icons';



class Bookshelf extends React.Component {
    selectBookshelf = () => {
        this.props.onClick(this.props.name)
    }

    render() {
        let className = "";
        let icon;
        if (this.props.selected === this.props.name | this.props.selected === true) {
            className = "selected-border";
        }
        
        if(this.props.icons === "faStream") icon = faStream;
        else if(this.props.icons === "faBookmark") icon = faBookmark;
        else if(this.props.icons === "faBookReader") icon = faBookReader;
        else if(this.props.icons === "faHeart") icon = faHeart;


        return (
            <div className={className} onClick={this.selectBookshelf}>
                <div className="bookshelf mt-2 px-3 py-2"><FontAwesomeIcon icon={icon} className="mr-2"/>{this.props.name}</div>
            </div>)
    }
}

export default Bookshelf