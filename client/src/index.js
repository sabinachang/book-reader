import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Example from "./components/APIExample";
import './index.css';
import App from './components/App';

render((
    <App>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/example' component={Example} />
            </Switch>
        </BrowserRouter>
    </App>

), document.getElementById('root'));
