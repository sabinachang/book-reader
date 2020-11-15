import React from 'react';
import "./bookshelf.css"
import { mapBookshelfToImg, getBooksInBookshelf, mapBookshelfToUrl } from '../../helper/utils'




class Bookshelf extends React.Component {
    state = { excludeBookshelf: [] }

    addToExcludeBookshelf = (data) => {
        const arr = [];
        for (var i = 0; i < data.length; i++) {
            arr.push(data[i].title)
        }
        this.setState({ excludeBookshelf: arr })
    }

    componentDidMount = () => {
        getBooksInBookshelf(mapBookshelfToUrl(this.props.name), this.addToExcludeBookshelf)

    }

    selectBookshelf = () => {
        this.props.onClick(this.props.name)
    }

    renderBookshelf = () => {
        if (!this.state.excludeBookshelf.includes(this.props.bookInfo.title)) {
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