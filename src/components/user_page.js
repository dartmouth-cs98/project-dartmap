// user_page.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

import UploadPhotoDialog from './upload_photo_dialog';

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadingPhoto: false,
    };
    this.openUploadPhotoDialog = this.openUploadPhotoDialog.bind(this);
    this.closeUploadPhotoDialog = this.closeUploadPhotoDialog.bind(this);
  }

  openUploadPhotoDialog() {
    this.setState({ uploadingPhoto: true });
  }

  closeUploadPhotoDialog() {
    this.setState({ uploadingPhoto: false });
  }

  // TODO: fix profile picture source, as well as user name, etc
  render() {
    return (
      <div className="profile">
        <div className="photo-container">
          <img
            className="photo"
            src={this.props.user.fbProfPicUrl}
            alt="You"
          />
          <div className="upload-photo">
            <button
              className="upload-photo-button"
              type="button"
              onClick={this.openUploadPhotoDialog}
            >
            Change Photo
            </button>
          </div>
        </div>
        <h1>Hi!</h1>
        <br />
        <UploadPhotoDialog
          uploadingPhoto={this.state.uploadingPhoto}
          closeUploadPhotoDialog={this.closeUploadPhotoDialog}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.user,
  }
);

export default connect(mapStateToProps, null)(UserPage);
