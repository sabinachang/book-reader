import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './index.css';
import Home from "./components/Home/Home";
import Example from "./components/APIExample";
import App from './components/App';
import Library from './components/Library/';
import Search from './components/Search/searchView';

render((
    <App>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/example' component={Example} />
                <Route exact path='/library' component={Library} />
                <Route exact path='/search' component={Search} />
            </Switch>
        </BrowserRouter>
    </App>

), document.getElementById('root'));
