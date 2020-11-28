import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  Nav1 from '../Common/nav1/Nav1';
import Nav2 from '../Common/nav2/Nav2';

class Home extends Component {
  render() {
    return (
      <div>
        <Nav1/>
        <Nav2/>
      </div>

    );
  }
}
export default Home;