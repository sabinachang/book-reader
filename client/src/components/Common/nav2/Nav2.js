import React, { Component } from 'react';
import "./Nav2.css";


class Nav extends Component {
    render() {
        return (
            <span>
                <nav className="navbar navbar-expand-lg pt-3 pb-4">
                    <div id="navbarNav">
                        <span><a href="/home" className="mr-3">Home</a></span> 
                        <span><a href="/library">Library</a></span> 
                    </div>
                </nav>
            </span>
        );
    }
}

export default Nav;