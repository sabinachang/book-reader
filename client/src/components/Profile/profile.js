import React, { Component } from 'react';
import  Nav1 from '../Common/nav1/Nav1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import './profile.css';


class Profile extends Component {
  constructor(props){
    super(props);
  }

  redirectToFriends = () => {
    this.props.history.push('/friends'); 
  }

  render() {
    return (
      <div>
        <Nav1/>
        <div className="d-flex row justify-content-center mt-4">
          <div className="col-9">
            <h4 className="my-4 ">User Profile</h4>
            <div className="manage-btn px-3 py-2 mr-2 mb-3" onClick={() => this.redirectToFriends()} >
              <FontAwesomeIcon icon={faUsers} className="my-2 custom-icon"/>
              <h6 className="mt-2 ml-3">Manage Friendships</h6>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Profile;