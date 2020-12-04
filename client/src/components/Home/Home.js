import React, { Component } from 'react';
import  Nav1 from '../Common/nav1/Nav1';
import Wall from '../Wall/index';

class Home extends Component {
  render() {
    return (
      <div>
        <Nav1/>
        <a href="/friends"></a>
      </div>

    );
  }
}
export default Home;