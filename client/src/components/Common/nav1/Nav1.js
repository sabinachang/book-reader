import React, { Component } from 'react';
import "./Nav1.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEllipsisH, faSearch } from '@fortawesome/free-solid-svg-icons';
import { getCookie } from '../../../helper'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            result: [],
        };
    }

    handleLogoutClick = (e) => {
        e.preventDefault();
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-custom sticky-top">
                    <a className="navbar-brand" href="/home"><h4><FontAwesomeIcon icon={faBook} className="mx-2" />BookReader</h4></a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav navbar-custom">
                            <a className="nav-item nav-link mr-3" href="/home">Home <span className="sr-only">(current)</span></a>
                            <a className="nav-item nav-link mr-3" href="/library">Library</a>
                            <a className="nav-item nav-link mr-3" href={`/${getCookie('username')}`}>My Wall</a>
                            <a className="nav-item nav-link mr-3" href="/profile">Profile</a>
                            <a className="nav-item nav-link" onClick={this.handleLogoutClick} >Logout</a>
                        </div>
                    </div>
                    <a className="nav-item nav-link" href="/search"><FontAwesomeIcon icon={faSearch} className="mr-2" />Search</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><FontAwesomeIcon icon={faEllipsisH} className="mr-2 toggler-custom" /></span>
                    </button>
                </nav>
            </div>

        );
    }
}

export default Nav;