import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

class UserRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: "none",
            loading: false,
        };
    }

    handleClick = clickEvent => {
        const prevRating = this.state.rating
        let curRating;
        if (clickEvent.target.value === prevRating) {
            curRating = "none";
        } else {
            curRating = clickEvent.target.value;
        }
        this.setState({
            loading: true,
        });
        axios.post(`/api/ratings/${this.props.book.isbn}`, {
            request_type: "rate-book",
            rating: {
                from: prevRating,
                to: curRating,
            }
        }, { withCredentials: true })
            .then((res) => {
                console.log(res)
                this.setState({
                    loading: false,
                    rating: res.data.rating,
                })
                console.log(this.state.rating)
                if (res.status === 200) {
                    this.props.notifyUpdate(true)
                } else {
                    console.log('something went wrong')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    };

    getUserRating = () => {
        axios.get(`/api/ratings/${this.props.book.isbn}`, { withCredentials: true })
            .then((res) => {
                this.setState({
                    loading: false,
                    rating: res.data.rating,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount = () => {
        this.getUserRating()
    }


    render() {
        return (
            
                <div>
                    <div className="d-flex justify-content-left mt-2">
                        {this.state.loading &&
                            <Spinner animation="border"></Spinner>
                        }
                        {this.state.rating === 'like' ? (
                            <Button onClick={this.handleClick} value="like" variant='primary' disabled={this.state.loading}><FontAwesomeIcon icon={faThumbsUp} className="mr-1"/>Like</Button>
                        ) : (
                                <Button onClick={this.handleClick} value="like" variant='secondary' disabled={this.state.loading}><FontAwesomeIcon icon={faThumbsUp} className="mr-1"/>Like</Button>

                            )}

                        {this.state.rating === 'dislike' ? (
                            <Button className="ml-2" onClick={this.handleClick} value="dislike" variant='primary' disabled={this.state.loading}><FontAwesomeIcon icon={faThumbsDown} className="mr-1"/>Dislike</Button>
                        ) : (
                                <Button className="ml-2" onClick={this.handleClick} value='dislike' variant='secondary' disabled={this.state.loading}><FontAwesomeIcon icon={faThumbsDown} className="mr-1"/>Dislike</Button>

                            )}
                    </div>
                </div>
            
        );
    }
}

export default UserRating;