import React, { Component } from 'react';
import Nav1 from '../Common/nav1/Nav1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './profile.css';
import PrivacyModal from '../Profile/privacyModal'
import NoPost from '../Wall/nopost';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, isAuthenticated: true }
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/api/users/authenticate', {
      withCredentials: true
    })
      .then()
      .catch(() => this.setState({ isAuthenticated: false }))
  }

  redirectToFriends = () => {
    this.props.history.push('/friends');
  }
  openSettingsModal = () => {
    this.setState({ modalVisible: true })
  }
  closeSettingsModal = () => {
    this.setState({ modalVisible: false })

  }

  displayContent = () => {
    return (
      <div>
        <span className="manage-btn px-3 py-2 mb-3" onClick={() => this.redirectToFriends()} >
          <span className="custom-btn">
            <FontAwesomeIcon icon={faUsers} className="my-2 custom-icon" />
            <h6 className="mt-2 ml-3">Manage Friendships</h6>
          </span>
        </span>

        <span onClick={this.openSettingsModal} className="manage-btn px-3 py-2 mb-3">
          <span className="custom-btn">
            <FontAwesomeIcon icon={faUsers} className="my-2 custom-icon" />
            <h6 className="mt-2 ml-3">Edit Privacy Settings</h6>
          </span>
        </span>
      </div>
    )


  }

  render() {
    return (
      <div>
        <Nav1 />
        <div className='container'>
          <PrivacyModal
            visible={this.state.modalVisible}
            handleClose={() => this.closeSettingsModal()}>
          </PrivacyModal>
          <div className="d-flex row justify-content-center mt-4 mb-6">
            <div className="col-9">
              <h4 className="mb-3">User Profile</h4>
              {this.state.isAuthenticated ? this.displayContent() : <NoPost isLoggedIn={false} text="Please login to view your profile. Click here to login or register." />}
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Profile;