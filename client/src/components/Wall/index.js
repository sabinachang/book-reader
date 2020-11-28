import React, { Component } from 'react';
import Post from './post'

class Wall extends Component {
    state = {
  
    }


    componentDidMount = () => {
       
    }


    render() {

        return (
            <div className = "container">
                <h1 className="mb-4">Public Wall</h1>
                    <Post/>
            </div>
            
        );
    }
}
export default Wall;