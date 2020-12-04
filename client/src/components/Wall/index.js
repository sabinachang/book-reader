import React, { Component } from 'react';
import Post from './post'
import axios from 'axios'
import { getCookie } from '../../helper'
import Nav1 from '../Common/nav1/Nav1';


class Wall extends Component {
    state = {
        posts: [],
        isUserWall: false,
    }

    componentDidMount = () => {
        const name = this.props.match.params.wall_id
        console.log(name)
        axios.get(`http://localhost:5000/api/wall/${name === "home" ? "public" : name}`, { withCredentials: true })
            .then((posts) => {
                this.setState({ posts: posts.data })
                if (getCookie('username') === name) {
                    this.setState({ isUserWall: true })
                }
            })
            .catch((response) => {
                if (response.message.includes("404")) {
                    alert(`${name} is not a registered user.`)
                } else if (response.message.includes("403")) {
                    alert(`${name}'s privacy settings prevents you from seeing their profile.`)
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

    render() {
        return (
            <div>
                <Nav1 />
                <div className="container my-3">
                    <h1 className="mb-4">{this.getWallName()}</h1>
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
                </div>
            </div>

        );
    }
}
export default Wall;