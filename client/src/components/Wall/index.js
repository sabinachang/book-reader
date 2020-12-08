import React, { Component } from 'react';
import Post from './post'
import NoPost from './nopost'
import axios from 'axios'
import { getCookie } from '../../helper'
import Nav1 from '../Common/nav1/Nav1';
import BookCard from './bookCard';
import './wall.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getBooksInBookshelf } from '../Library/helper/utils'


class Wall extends Component {
    state = {
        posts: [],
        loading: "",
        noPostsFound: "",
        isLoggedIn: true,
        private: false,
        favorites: []
    }

    componentDidMount = () => {
        const name = this.props.match.params.wall_id
        axios.get(`http://localhost:5000/api/wall/${name === "home" ? "public" : name}`, { withCredentials: true })
            .then((posts) => {
                if (posts.data.length > 0) {
                    this.setState({ posts: posts.data, loading: false })
                } else {
                    this.setState({ noPostsFound: "No Posts Found", loading: false })
                }
            })
            .catch((response) => {
                if (response.message.includes("401") || name === 'null') {
                    this.setState({ loading: false, noPostsFound: `You are not currently signed in. Please click to login or register.`, isLoggedIn: false })
                } else if (response.message.includes("403")) {
                    this.setState({ loading: false, noPostsFound: `${name}'s privacy settings prevents you from seeing their profile.` })
                } else if (response.message.includes("404")) {
                    this.setState({ loading: false, noPostsFound: `${name} is not a registered user.` })

                }
            })

    }

    getWallName = () => {
        const name = this.props.match.params.wall_id
        if (name.toLowerCase() === 'home') {
            return "Public Wall"
        } else {
            return name[0].toUpperCase() + name.substr(1).toLowerCase() + "'s Wall"
        }
    }

    getFavoriteName = () => {
        const name = this.props.match.params.wall_id
        if (name.toLowerCase() !== 'home') {
            return name[0].toUpperCase() + name.substr(1).toLowerCase() + "'s Favorite Books"
        }
    }

    getTopFavoriteBooks = () => {
        getBooksInBookshelf("topfavorites", (data) => {
            this.setState({ favorites: data })
        })
    }

    render() {
        this.getTopFavoriteBooks();
        return (
            <div className="wall-bg">
                <Nav1 />
                <div className="d-flex row justify-content-center mt-4 mb-6">
                    <div className="col-8">
                        <h4 className="mb-4 mt-3">{this.getWallName()}</h4>
                        
                        <div className={this.props.match.params.wall_id === 'home'? "public-wall" : "private-wall"}>
                            <div className="mb-4 pb-2">
                                <div className="d-flex justify-content-between">
                                    <span><h6><FontAwesomeIcon icon={faBookReader} className="mr-2"/>{this.getFavoriteName()}</h6></span>
                                    <span className="bookshelf-library px-3 py-2">
                                        <FontAwesomeIcon icon={faUserCircle} className="mr-2"/>About</span>
                                </div>
                                
                                <div className="bookcard-wrapper">
                                {this.state.favorites.map(book => (
                                    <BookCard
                                        title={book.title}
                                        img={book.thumbnail}
                                    />
              
                                ))}
                                </div>
                            </div>
                        </div>
                        

                        {this.state.loading && <div className="loader"></div>}
                        {this.state.posts.map((post) => (
                            <Post
                                match={this.props.match}
                                key={post._id}
                                body={post.bodytext}
                                id={post._id}
                                title={post.title}
                                owner={post.owner}
                                likes={post.likes}
                                images={post.images}
                                timestamp={post.timestamp}
                            />
                        ))}
                        {this.state.noPostsFound && <NoPost text={this.state.noPostsFound} isLoggedIn={this.state.isLoggedIn} />}
                    </div>
                </div>
            </div>

        );
    }
}
export default Wall;