import React, { Component } from 'react';
import Post from './post'
import axios from 'axios'
import { getCookie } from '../../helper'


class Wall extends Component {
    state = {
        posts: [],
        isUserWall: false,
    }

    componentDidMount = () => {
        const name = this.props.match.params.wall_id
        axios.get(`http://localhost:5000/api/wall/${name}`, { withCredentials: true })
            .then((posts) => {
                this.setState({ posts: posts.data })
                if (getCookie('username') === name) {
                    this.setState({ isUserWall: true })
                }
            })
            .catch((response) => {
                console.log(response)
            })

    }

    getWallName = () => {
        const name = this.props.match.params.wall_id
        if (name.toLowerCase() === 'public') {
            return "Public Wall"
        } else {
            return name[0].toUpperCase() + name.substr(1).toLowerCase() + "'s Wall"
        }
    }

    render() {
        return (
            <div className="container">

                <h1 className="mb-4">{this.getWallName()}</h1>
                {this.state.posts.map((post) => (
                    <Post
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
            </div>

        );
    }
}
export default Wall;