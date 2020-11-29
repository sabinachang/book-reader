import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Message from './message'; 

class UserReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userReview: null,
        }
        this.textInput = React.createRef()
    }

    componentDidMount = () => {
        this.checkHasReview()
    }

    checkHasReview = () => {
        axios.get(`/api/reviews/${this.props.book.isbn}`, { withCredentials: true })
        .then((res) => {
            if (res.status === 200) {
                let review
                if (res.data.review.length === 0) {
                    review = null
                } else {
                    review = res.data.review[0]
                }

                this.setState({
                    loading: false,
                    userReview: review,
                })
           } else {
               console.log('something went wrong')
           }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onPostClick = (e) => {
        e.preventDefault()
        const r = this.textInput.current.value
        
        console.log(r)

        this.setState( prevState => ({
            ...prevState,
            loading: true,
        }))
        axios.post(`/api/reviews/${this.props.book.isbn}`, {
            review: r,
        },  {withCredentials: true})
        .then((res) => {
            if (res.status === 200) {
                this.setState({
                    loading: false,
                    userReview: res.data.review,
                })
                this.props.notifyUpdate()
           } else {
               console.log('something went wrong')
           }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getReviewUI = () => {
        return (
            <>
             { this.state.userReview ? (
                <Message message= {this.state.userReview}></Message>
            ) : (
                <Form className="col-lg-6"onSubmit={this.onPostClick}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Write your review</Form.Label>
                        <Form.Control ref={this.textInput}  as="textarea" rows={3} />

                    </Form.Group>
                    { this.state.loading ? (
                        <Button variant="secondary" disabled>
                         <Spinner
                         as="span"
                         animation="border"
                         size="sm"
                         role="status"
                         aria-hidden="true"
                       />
                       Loading
                       </Button>
                    ) : (
                       <Button variant="primary" type="submit">
                           Post
                       </Button> 
                    )} 
                </Form>
            )}
            </>
        )
    }


    render() {
        return (
            <>
            { this.state.loading ? (
                <div className="d-flex">
                    <Spinner animation="border" />
                    <p>Loading...</p>
                </div>
            ) : (
               this.getReviewUI()
            )}
            </>
        )
    }
}

export default UserReview;