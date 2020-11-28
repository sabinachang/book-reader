import React, { Component } from 'react';
import "./Nav1.css";
import SearchInputForm from '../searchBar/SearchInputForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';


class Nav extends Component {
    constructor(props) {
		super(props);
		this.state = {
			search: '',
			result: [],
		};
    }
    
    render() {
        return (
            <nav className="navbar bg-custom">
                <a className="navbar-brand" href="/home"><h4><FontAwesomeIcon icon={faBook} className="mr-2"/>BookReader</h4></a>
                <span className="search-bar">
                    <SearchInputForm 
                        search={this.state.search}
                        handleInputChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                    />
                </span>
                <span><a className="nav-link" href="/profile">Profile</a></span>
                <span><a className="nav-link" href="/">Logout</a></span>
            </nav>
        );
    }
}

export default Nav;