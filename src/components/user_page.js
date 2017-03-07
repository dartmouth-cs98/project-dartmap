// user_page.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab, Menu, MenuItem, Card, Avatar, Drawer } from 'material-ui';
import { zIndex } from 'material-ui/styles';
import CancelNavigation from 'material-ui/svg-icons/navigation/cancel';

// import the redux actions
import { logout } from '../actions';

import { getAllEvents } from '../helpers/dartmap-api';
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
    this.sortEventList = this.sortEventList.bind(this);
    this.logout = this.logout.bind(this);
  }

  onEventListItemClick = (eventId) => {
    console.log('Button clicked ', eventId);
  }

  openUploadPhotoDialog() {
    this.setState({ uploadingPhoto: true });
  }

  closeUploadPhotoDialog() {
    this.setState({ uploadingPhoto: false });
  }

  sortEventList(eventList) {
    return eventList.sort(sortDateTimeReverse);
  }

  logout() {
    this.props.logout();
    window.location.replace('../');
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

// <RaisedButton label="Change Photo" primary onClick={this.openUploadPhotoDialog} />
    return (
      <div>
        <Tabs style={{ position: 'static', top: 0, width: '100%', marginTop: '60px', zIndex: 5000 }}>
          <Tab label="Submitted Events" href="#SubmitEvents">
            <div className="user-event-list">
              <UserEventList
                events={this.state.eventList}
                onEventListItemClick={this.onEventListItemClick}
              />
            </div>
          </Tab>
          <Tab label="RSVP'ed Events" href="#RSVPEvents">
            <div className="user-event-list">
              <UserEventList
                events={this.state.eventList}
                onEventListItemClick={this.onEventListItemClick}
              />
            </div>
          </Tab>
        </Tabs>
        
      </div>
    );
  }
}

const mapDispatchToProps = { logout };

const mapStateToProps = state => (
  {
    user: state.user,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
