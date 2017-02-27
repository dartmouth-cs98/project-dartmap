// user_page.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllEvents } from '../helpers/dartmap-api';
import UploadPhotoDialog from './upload_photo_dialog';
import UserEventList from './user_profile_event_list';
import { sortDateTimeReverse } from '../helpers/date-time-filters-helper';

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
    this.sortEventList = this.sortEventList.bind(this);
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

  // facebookLogout() {
  //   fbLogout();
  // }

  sortEventList(eventList) {
    return eventList.sort(sortDateTimeReverse);
  }

  // TODO: fix profile picture source, as well as user name, etc
  render() {
    if (this.state.eventList == null) {
      getAllEvents((unsortedEventList) => {
        const eventList = this.sortEventList(unsortedEventList.payload.events);
        this.setState({ eventList });
      });
      return null;
    }
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

const mapStateToProps = state => (
  {
    user: state.user,
  }
);

export default connect(mapStateToProps, null)(UserPage);
