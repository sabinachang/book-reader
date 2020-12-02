import React, { Component } from 'react';
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css';


class Post extends Component {
    state = {
        showCommentBox: false,
        commentValue: '',
        userLiked: false,
        likeText: 'Be the first to like this post!',
        currentLikes: 0,
        comments: [],
        commentsLength: 2
    }

    getCookie = (name) => {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    componentDidMount = () => {
        axios.get(`http://localhost:5000/api/wall/${this.props.id}/comments`, { withCredentials: true })
            .then((comments) => {
                console.log(comments.data)
                this.setState({ comments: comments.data })
            })

        if (this.props.likes.length === 1) {
            this.setState({ likeText: '1 person liked this post', currentLikes: 1 })
        } else if (this.props.likes.length > 1) {
            const count = this.props.likes.length;
            this.setState({ likeText: count + ' people liked this post', currentLikes: count })

        }

        if (this.props.likes.includes(localStorage.getItem('username')) || this.props.likes.includes(this.getCookie('username'))) {
            this.setState({ userLiked: true })
        }

    }




    handleCommentChange = (event) => {
        this.setState({ commentValue: event.target.value });

    }

    displayImages = () => {
        return <div className="d-flex justify-content-around">
            {this.props.images.map(image => {
                return <img key={image} style={{ width: "12rem" }} className="card-img" src={image} alt="Book Cover" />
            })}
        </div>


    }

    postComment = (event) => {
        if (event.key === 'Enter') {
            axios.post(`http://localhost:5000/api/wall/${this.props.id}/comments`, { comment: this.state.commentValue }, { withCredentials: true })
                .then((response) => {
                    if (response.data.msg === 'comment added') {
                        console.log('comment added')
                        this.setState({ commentValue: '' })
                        const newComments = this.state.comments
                        newComments.push(response.data.comment)
                        this.displayAllComments()
                        this.setState({ comments: newComments })
                    }
                })
        }
    }

    toggleCommentBox = () => {
        this.setState({ showCommentBox: !this.state.showCommentBox })
    }


    toggleLike = () => {
        axios.post(`http://localhost:5000/api/wall/${this.props.id}/likes`, {}, { withCredentials: true })
            .then((like) => {
                if (like.data.msg === 'like added') {
                    this.setState({ currentLikes: this.state.currentLikes + 1 })

                    const msg = this.determineLikes()
                    this.setState({ userLiked: true, likeText: msg })
                } else {
                    this.setState({ currentLikes: this.state.currentLikes - 1 })
                    const msg = this.determineLikes()

                    this.setState({ userLiked: false, likeText: msg })
                }
            })
    }

    displayAllComments = () => {
        this.setState({ commentsLength: this.state.comments.length })
    }

    determineLikes = () => {
        let msg;
        if (this.state.currentLikes === 1) {
            msg = '1 person liked this post'
        }
        else if (this.state.currentLikes > 1) {
            const count = this.state.currentLikes;

            msg = count + ' people liked this post'
        } else {
            msg = 'Be the first to like this post'

        }
        return msg;

    }

    getComments = () => {
        if (this.state.comments.length > 0) {
            return <div className="card-footer">
                {this.state.comments.slice(0, this.state.commentsLength).map(comment => {
                    return (
                        <div className="border-top border-black my-1">
                            <div className="d-flex justify-content-between">
                                <div>
                                    {comment.author}
                                </div>
                                <div>
                                    {this.convertTime(comment.timestamp)}
                                </div>
                            </div>
                            {comment.body}
                        </div>
                    )
                })}
                {this.state.comments.length > 2 && this.state.comments.length !== this.state.commentsLength &&
                    <p onClick={this.displayAllComments} className="btn btn-link">
                        See More Comments
                    </p>
                }
                {this.state.commentsLength > 2 && this.state.comments.length === this.state.commentsLength &&
                    <p onClick={() => this.setState({ commentsLength: 2 })} className="btn btn-link">
                        See Fewer Comments
                    </p>
                }
            </div>
        }


    }

    convertTime = (timestamp) => {
        const posted_date = new Date(timestamp)
        const today = new Date()
        const diff_in_seconds = (today - posted_date) / 1000
        if (diff_in_seconds <= 60) {
            return "Less than one minute ago"
        } else if (diff_in_seconds <= 3600) {
            return "Less than one hour ago"
        } else if (diff_in_seconds <= 86400) {
            const hrs = Math.trunc(diff_in_seconds / 3600)
            if (hrs === 1) {
                return hrs + " hour ago"
            } else {
                return hrs + " hours ago"
            }
        } else {
            const days = Math.trunc((diff_in_seconds / 3600) / 24)
            return days + " days ago"
        }
    }

    render() {
        let button;
        if (this.state.userLiked) {
            button = <i style={{ cursor: 'pointer', color: '#66ff00' }} onClick={this.toggleLike} className="fa fa-lg fa-thumbs-up" />

        } else {
            button = <i style={{ cursor: 'pointer' }} onClick={this.toggleLike} className="fa fa-lg fa-thumbs-up" />

        }


        return (
            <div className="card border-dark mb-4">
                <div className="card-header">
                    {this.props.owner} | {this.convertTime(this.props.timestamp)}

                </div>
                <div className="card-body text-center">
                    <p className="card-title">{this.props.title}</p>
                    <p className="card-text">{this.props.body}</p>
                    {this.displayImages()}
                </div>
                <div className='card-footer'>
                    {this.state.likeText}
                </div>
                {this.getComments()}
                <div className="card-footer text-muted">

                    <div className="d-flex justify-content-around pb-1">

                        {button}
                        <i style={{ cursor: 'pointer' }} onClick={this.toggleCommentBox} className="fa fa-lg fa-comment" />

                    </div>


                </div>
                { this.state.showCommentBox && <div className="card-footer text-muted">

                    <div className="form-group">
                        <input onKeyPress={this.postComment} onChange={this.handleCommentChange} style={{ borderRadius: "15px" }} type="text" value={this.state.commentValue} className="form-control" placeholder="Write a comment..." />

                    </div>

                </div>}
            </div>
        );
    }
}
export default Post;
