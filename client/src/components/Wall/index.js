import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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


// const MenuItem = this.state.favorites.map(book => {
//     return <BookCard
//         title={book.title}
//         img={book.thumbnail}
//     />;
// })

// export const Menu = this.state.favorites.map(book => {
//     const {name} = book;
//     return <MenuItem key={name}/>;
// })

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
                                <Carousel
                                additionalTransfrom={0}
                                arrows
                                autoPlay
                                autoPlaySpeed={3000}
                                centerMode={false}
                                className=""
                                containerClass="container-with-dots"
                                dotListClass=""
                                draggable
                                focusOnSelect={false}
                                infinite
                                itemClass=""
                                keyBoardControl
                                minimumTouchDrag={80}
                                renderButtonGroupOutside={false}
                                renderDotsOutside={false}
                                responsive={{
                                    desktop: {
                                    breakpoint: {
                                        max: 3000,
                                        min: 1024
                                    },
                                    items: 4,
                                    partialVisibilityGutter: 40
                                    },
                                    mobile: {
                                    breakpoint: {
                                        max: 464,
                                        min: 0
                                    },
                                    items: 2,
                                    partialVisibilityGutter: 30
                                    },
                                    tablet: {
                                    breakpoint: {
                                        max: 1024,
                                        min: 464
                                    },
                                    items: 2,
                                    partialVisibilityGutter: 30
                                    }
                                }}
                                showDots={false}
                                sliderClass=""
                                slidesToSlide={4}
                                swipeable
                                >
                                    {this.state.favorites.map(book => (
                                        <BookCard
                                            title={book.title}
                                            img={book.thumbnail}
                                        />
        
                                    ))}

                                </Carousel>
                                {/* <ScrollMenu
                                    data={Menu}
                                    arrowLeft={<div style={{ fontSize: "30px" }}>{" < "}</div>}
                                    arrowRight={<div style={{ fontSize: "30px" }}>{" > "}</div>}
                                /> */}
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