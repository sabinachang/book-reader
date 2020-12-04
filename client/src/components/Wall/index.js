import React, { Component } from 'react';
import Post from './post'
import PrivacyModal from './privacyModal'
import axios from 'axios'
import { getCookie } from './helper'


class Wall extends Component {
    state = {
        posts: [],
        isUserWall: false,
        modalVisible: false
    }

    openSettingsModal = () => {
        this.setState({ modalVisible: true })
    }
    closeSettingsModal = () => {
        this.setState({ modalVisible: false })

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
                <PrivacyModal
                    visible={this.state.modalVisible}
                    handleClose={() => this.closeSettingsModal()}>
                </PrivacyModal>
                <h1 className="mb-4">{this.getWallName()}</h1>
                {this.state.isUserWall &&
                    <div onClick={this.openSettingsModal} className="d-flex justify-content-end mb-3">
                        <i style={{ fontSize: "1.5rem", cursor: "pointer" }} className="fa fa-cog"> Settings</i>
                    </div>
                }
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