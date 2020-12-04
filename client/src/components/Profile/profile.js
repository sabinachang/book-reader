import React, { Component } from 'react';
import Nav1 from '../Common/nav1/Nav1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import './profile.css';
import PrivacyModal from '../Profile/privacyModal'


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false }
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
  render() {
    return (
      <div>
        <PrivacyModal
          visible={this.state.modalVisible}
          handleClose={() => this.closeSettingsModal()}>
        </PrivacyModal>
        <Nav1 />
        <div className="d-flex row justify-content-center mt-4">
          <div className="col-9">
            <h4 className="my-4 ">User Profile</h4>

            <span className="manage-btn px-3 py-2 mb-3" onClick={() => this.redirectToFriends()} >
              <span className="custom-btn">
                <FontAwesomeIcon icon={faUsers} className="my-2 custom-icon" />
                <h6 className="mt-2 ml-3">Manage Friendships</h6>
              </span>
            </span>

            <span onClick={this.openSettingsModal} className="manage-btn px-3 py-2 mb-3">
              <span className="custom-btn">
                <FontAwesomeIcon icon={faUsers} className="my-2 custom-icon" />
                <h6 className="mt-2 ml-3">Edit your profile</h6>
              </span>
            </span>

          </div>
        </div>
      </div>

    );
  }
}
export default Profile;