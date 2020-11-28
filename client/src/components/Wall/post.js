import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css'; 


class Post extends Component {
    state = {
        showCommentBox: false
    }


    componentDidMount = () => {
    }
    displayImages = () => {
    
        return this.props.images.map((img) => {
            <img style={{width: "12rem"}} className="card-img" src={img} alt="Book Cover"/>

            })}
    

    toggleCommentBox = () => {
        this.setState({showCommentBox: !this.state.showCommentBox})
    }

    convertTime = (timestamp) => {
        const posted_date = new Date(timestamp)
        const today = new Date()
        const diff_in_seconds =  (today - posted_date) /1000
        if (diff_in_seconds <= 60){
            return "Less than one minute ago"
        } else if (diff_in_seconds <= 3600) {
            return "Less than one hour ago"
        } else if (diff_in_seconds <= 86400) {
            const hrs = Math.trunc(diff_in_seconds/3600)
            if (hrs === 1) {
                return hrs + " hour ago"
            } else {
                return hrs + " hours ago"
            }
        } else {
            const days = Math.trunc((diff_in_seconds/3600) /24)
            return days + " days ago"
        }
    }

    render() {


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
            <div className="card-footer text-muted">

<div className = "d-flex justify-content-around pb-1">
<i className="fa fa-lg fa-thumbs-up"/>
<i onClick = {this.toggleCommentBox} className="fa fa-lg fa-comment"/>

</div>


            </div>
           { this.state.showCommentBox &&  <div className="card-footer text-muted">

                <div className="form-group">
                <input style={{borderRadius: "15px"}} type="text" className="form-control" placeholder="Write a comment..."/>

                 </div>

        </div>}
          </div>      
            );
    }
}
export default Post;
