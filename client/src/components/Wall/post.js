import React, { Component } from 'react';

class Post extends Component {
    state = {
  
    }


    componentDidMount = () => {
       
    }


    render() {

        return (
<div class="card border-dark text-center">
            <div class="card-header">
              Owner
            </div>
            <div class="card-body">
              <h5 class="card-title">Title of the post posted</h5>
              <p class="card-text">The additional text is displayed here if present</p>
              <img style={{width: "10rem"}} class="card-img" src="https://books.google.com/books/content?id=eEgC3bS4dOwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="Card image"/>
            </div>
            <div class="card-footer text-muted">
              2 days ago
            </div>
          </div>      
            );
    }
}
export default Post;
