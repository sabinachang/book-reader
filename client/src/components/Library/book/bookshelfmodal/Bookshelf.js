import React from 'react';
import "./bookshelf.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faBookmark, faBookReader, faHeart } from '@fortawesome/free-solid-svg-icons';
import { getBooksInBookshelf, mapBookshelfToUrl } from '../../helper/utils'
import NoPost from '../../../Wall/nopost';


class Bookshelf extends React.Component {
    state = { excludeBookshelf: [], isAuthenticated: true }

    addToExcludeBookshelf = (data) => {
        const arr = [];
        for (let i = 0; i < data.length; i++) {
            arr.push(data[i].title)
        }
        this.setState({ excludeBookshelf: arr })
    }

    getBooksCallback = (data) => {
        if (this.state.isAuthenticated && data.message.includes("401")) {
            this.setState({ isAuthenticated: false })
            console.log("Unauthenticated")
        } else if (this.state.isAuthenticated) {
            this.addToExcludeBookshelf(data)
        }
    }

    componentDidMount = () => {
        getBooksInBookshelf(mapBookshelfToUrl(this.props.name), this.getBooksCallback)

    }

    selectBookshelf = () => {
        this.props.onClick(this.props.name)
    }

    renderBookshelf = () => {
        let icon;
        if (this.props.icons === "faStream") icon = faStream;
        else if (this.props.icons === "faBookmark") icon = faBookmark;
        else if (this.props.icons === "faBookReader") icon = faBookReader;
        else if (this.props.icons === "faHeart") icon = faHeart;

        if (!this.state.excludeBookshelf.includes(this.props.bookInfo.title)) {
            let className = "";
            if (this.props.selected === this.props.name | this.props.selected === true) {
                className = "selected-border";
            }
            return (
                <div className={className} onClick={this.selectBookshelf}>
                    <div className="bookshelf mt-2 px-3 py-2"><FontAwesomeIcon icon={icon} className="mr-2" />{this.props.name}</div>
                </div>)
        }
        else {
            return (
                <div className="unselectable-bookshelf">
                    This book is already in the {this.props.name} bookshelf
                    <div className="bookshelf mt-2 px-3 py-2"><FontAwesomeIcon icon={icon} className="mr-2" />{this.props.name}</div>
                </div>)
        }
    }

    render() {
        return this.state.isAuthenticated ? this.renderBookshelf() : this.props.name === "Read" && <NoPost text="You must login to add a book to a bookshelf." isLoggedIn={false} />
    }
}

export default Bookshelf;