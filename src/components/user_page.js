// user_page.js

import React, { Component } from 'react';
import { getAllEvents } from '../helpers/dartmap-api';

import UploadPhotoDialog from './upload_photo_dialog';

import UserEventList from './user_profile_event_list';

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadingPhoto: false,
      eventList: null,
    };
    this.openUploadPhotoDialog = this.openUploadPhotoDialog.bind(this);
    this.closeUploadPhotoDialog = this.closeUploadPhotoDialog.bind(this);
    this.onEventListItemClick = this.onEventListItemClick.bind(this);
  }

  // getEvents() {
  //   getAllEvents((eventList) => {
  //     console.log('mount eventList');
  //     console.log(eventList);
  //     this.setState({ eventList });
  //   });
  // }

  onEventListItemClick(eventId) {
    console.log('Button clicked ', eventId);
  }

  openUploadPhotoDialog() {
    this.setState({ uploadingPhoto: true });
  }

  closeUploadPhotoDialog() {
    this.setState({ uploadingPhoto: false });
  }

  // TODO: fix profile picture source, as well as user name, etc
  render() {
    console.log(this.state.eventList);
    if (this.state.eventList == null) {
      getAllEvents((eventList) => {
        this.setState({ eventList });
      });
      console.log('eventList is null');
      return null;
    }
    console.log('eventList is not null');
    return (
      <div className="profile">
        <div className="photo-container">
          <img
            className="photo"
            src={document.getElementById('fb-pic').src}
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
        <h1>Your submitted events:</h1>
        <UploadPhotoDialog
          uploadingPhoto={this.state.uploadingPhoto}
          closeUploadPhotoDialog={this.closeUploadPhotoDialog}
        />
        <UserEventList
          events={this.state.eventList}
          onEventListItemClick={this.onEventListItemClick}
        />
      </div>
    );
  }
}

export default UserPage;
