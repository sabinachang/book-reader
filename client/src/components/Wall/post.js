import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css'; 


class Post extends Component {
    state = {
        showCommentBox: false
    }


    componentDidMount = () => {
       
    }

    toggleCommentBox = () => {
        this.setState({showCommentBox: !this.state.showCommentBox})
    }

    render() {

        return (
<div className="card border-dark mb-4">
            <div className="card-header">
              Owner | 2 days ago

            </div>
            <div className="card-body text-center">
              <h5 className="card-title">Title of the post posted</h5>
              <p className="card-text">The additional text is displayed here if present</p>
              <img style={{width: "12rem"}} className="card-img" src="https://books.google.com/books/content?id=eEgC3bS4dOwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="Book Cover"/>
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
