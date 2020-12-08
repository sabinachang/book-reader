import React, { Component } from 'react';
import Nav1 from '../Common/nav1/Nav1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';
import NoPost from '../Wall/nopost';
import { faUsers, faKey, faBook } from '@fortawesome/free-solid-svg-icons';
import './profile.css';
import PrivacyModal from './privacyModal'
import FavoriteBookModal from './favoriteBookModal'


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isAuthenticated: null,
      privacyVisible: false,
      favoriteBookVisible: false,
      favoriteBookVisibleDelete: false
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/api/users/authenticate', {
      withCredentials: true
    })
      .then(() => this.setState({ isAuthenticated: true }))
      .catch(() => this.setState({ isAuthenticated: false }))
  }

  redirectToFriends = () => {
    this.props.history.push('/friends');
  }
  openPrivacyModal = () => {
    this.setState({ privacyVisible: true })
  }
  closePrivacyModal = () => {
    this.setState({ privacyVisible: false })
  }
  openFavoriteBookModal = () => {
    this.setState({ favoriteBookVisible: true })
  }
  closeFavoriteBookModal = () => {
    this.setState({ favoriteBookVisible: false })
  }
  openDeleteFavoriteBookModal = () => {
    this.setState({ favoriteBookVisibleDelete: true })
  }
  closeDeleteFavoriteBookModal = () => {
    this.setState({ favoriteBookVisibleDelete: false })
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

        <span onClick={this.openPrivacyModal} className="manage-btn px-3 py-2 mb-3">
          <span className="custom-btn">
            <FontAwesomeIcon icon={faKey} className="my-2 custom-icon" />
            <h6 className="mt-2 ml-3">Edit Privacy Settings</h6>
          </span>
        </span>

        <span onClick={this.openFavoriteBookModal} className="manage-btn px-3 py-2 mb-3">
          <span className="custom-btn">
            <FontAwesomeIcon icon={faBook} className="my-2 custom-icon" />
            <h6 className="mt-2 ml-3">Add Top Favorite Books</h6>
          </span>
        </span>

        <span onClick={this.openDeleteFavoriteBookModal} className="manage-btn px-3 py-2 mb-3">
          <span className="custom-btn">
            <FontAwesomeIcon icon={faBook} className="my-2 custom-icon" />
            <h6 className="mt-2 ml-3">Delete Top Favorite Books</h6>
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
            visible={this.state.privacyVisible}
            handleClose={() => this.closePrivacyModal()}>
          </PrivacyModal>
          <FavoriteBookModal
            func="add"
            visible={this.state.favoriteBookVisible}
            isAuthenticated={this.state.isAuthenticated}
            handleClose={() => this.closeFavoriteBookModal()}>
          </FavoriteBookModal>

          <FavoriteBookModal
            func="delete"
            visible={this.state.favoriteBookVisibleDelete}
            isAuthenticated={this.state.isAuthenticated}
            handleClose={() => this.closeDeleteFavoriteBookModal()}>
          </FavoriteBookModal>

          <div className="d-flex row justify-content-center mt-4 mb-6">
            <div className="col-9">
              <h4 className="mb-3">User Profile</h4>
              {this.state.isAuthenticated === true ? this.displayContent() :
                this.state.isAuthenticated === false ? <NoPost isLoggedIn={false} text="Please login to view your profile. Click here to login or register." /> : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;