import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './index.css';
import Home from "./components/Home/Home";
import App from './components/App';
import Library from './components/Library/';
import Search from './components/Search/searchView';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import FriendHome from './components/Friend/';
import Profile from './components/Profile/profile';
import Wall from './components/Wall/';

render((
    <App>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/library' component={Library} />
                <Route exact path='/search' component={Search} />
                <Route exact path='/friends' component={FriendHome} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/wall/public' component={Wall} />
            </Switch>
        </BrowserRouter>
    </App>

), document.getElementById('root'));
