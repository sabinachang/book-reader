import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import User from './pages/User';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/user' component={User}/>
        </Switch>
      </div>
    )
    return (
      <div>
         <h1>Book reader T06</h1>
          <ul className="header">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/user">Users</Link></li>
            <li><Link to="/Library">Library</Link></li>
          </ul>
          <Switch>
            <App/>
          </Switch>
      </div>
     
    );
  }
}

export default App;