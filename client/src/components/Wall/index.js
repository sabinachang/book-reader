import React, { Component } from 'react';
import Post from './post'
import axios from 'axios'
class Wall extends Component {
    state = {
        posts: []
    }


    componentDidMount = () => {
        axios.get(`http://localhost:5000/api/wall/public`, { withCredentials: true })
            .then((posts) => {
                this.setState({ posts: posts.data })
            })

    }


    render() {

        return (
            <div className="container">
                <h1 className="mb-4">Public Wall</h1>
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