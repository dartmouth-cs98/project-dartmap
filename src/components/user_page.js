// user_page.js

import React, { Component } from 'react';

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
    console.log('CLICKED BUTTON');
    this.setState({ uploadingPhoto: true });
  }

  closeUploadPhotoDialog() {
    this.setState({ uploadingPhoto: false });
  }

  render() {
    return (
      <div className="profile">
        <div className="photo-container">
          <img 
            className="photo" 
            src="https://s27.postimg.org/ws3spwi9f/unknown.png" 
            alt="You" 
          />
          <div className="upload-photo">
            <button 
              className="upload-photo-button" 
              type="button" 
              onClick={this.openUploadPhotoDialog}>
            Change Photo
            </button>
          </div>
        </div>
        <h1>Hi, Edrei!</h1>
        <br />
        <h2>Name: Edrei Chua</h2>
        <UploadPhotoDialog
          uploadingPhoto={this.state.uploadingPhoto}
          closeUploadPhotoDialog={this.closeUploadPhotoDialog}
        />
      </div>
    );
  }
}

export default UserPage;
