import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Book reader T06</h1>
        <ul className="header">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/example">Example of how to use API</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/friends">Manage my friendships</Link></li>
          <li><Link to="/">Login</Link></li>
        </ul>
      </div>

    );
  }
}
export default Home;