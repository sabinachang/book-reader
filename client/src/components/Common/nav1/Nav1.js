import React, { Component } from 'react';
import "./Nav1.css";
import SearchInputForm from '../searchBar/SearchInputForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEllipsisH, faSearch } from '@fortawesome/free-solid-svg-icons';


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
            <div>
                <nav class="navbar navbar-expand-lg bg-custom sticky-top">
                    <a className="navbar-brand" href="/home"><h4><FontAwesomeIcon icon={faBook} className="mr-2"/>BookReader</h4></a>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav navbar-custom">
                            <a class="nav-item nav-link mr-3" href="/home">Home <span class="sr-only">(current)</span></a>
                            <a class="nav-item nav-link mr-3" href="/library">Library</a>
                            <a class="nav-item nav-link mr-3" href="/profile">Profile</a>
                            <a class="nav-item nav-link" href="/">Logout</a>
                        </div>
                    </div>
                    <a class="nav-item nav-link" href="/search"><FontAwesomeIcon icon={faSearch} className="mr-2"/>Search</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"><FontAwesomeIcon icon={faEllipsisH} className="mr-2 toggler-custom"/></span>
                    </button>
                </nav>
            </div>
            
        );
    }
}

export default Nav;