import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

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
              this.props.notifyUpdate()
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
            console.log(res)
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
        <div className="container">
          <div className="row mt-3">
              <div className="col-sm-5 col-lg-3  d-flex justify-content-between">
                  { this.state.loading && 
                      <Spinner animation="border"></Spinner>
                  }
                  { this.state.rating === 'like' ? (
                      <Button onClick={this.handleClick} value="like" variant='primary' disabled={this.state.loading}>Like</Button> 
                  ) : (
                    <Button onClick={this.handleClick} value="like" variant='light' disabled={this.state.loading}>Like</Button> 

                  )}

                  { this.state.rating === 'dislike' ? (
                      <Button onClick={this.handleClick} value="dislike" variant='primary' disabled={this.state.loading}>Dislike</Button>
                      ) : (
                        <Button onClick={this.handleClick} value="dislike" variant='light' disabled={this.state.loading}>Dislike</Button>

                      )}
              </div>
          </div>
        </div>
      );
    }
}

export default UserRating;