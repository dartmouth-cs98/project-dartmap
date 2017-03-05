// user_page.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab, Menu, MenuItem, Card, Avatar, Drawer } from 'material-ui';
import { zIndex } from 'material-ui/styles';
import CancelNavigation from 'material-ui/svg-icons/navigation/cancel';
import RefreshNavigation from 'material-ui/svg-icons/navigation/refresh';

// import the redux actions
import { logout } from '../actions';

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
    this.logout = this.logout.bind(this);
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
        <Tabs style={{ marginLeft: '28%', position: 'static', top: 0, width: '72%', marginTop: '60px', zIndex: 1500 }}>
          <Tab label="Submitted Events" href="#SubmitEvents">
            <div className="user-event-list">
              <h1>Your Submitted Events</h1>
              <UserEventList
                events={this.state.eventList}
                onEventListItemClick={this.onEventListItemClick}
              />
            </div>
          </Tab>
          <Tab label="RSVP'ed Events" href="#RSVPEvents">
            <div className="user-event-list">
              <h1>Your RSVP Events</h1>
              <UserEventList
                events={this.state.eventList}
                onEventListItemClick={this.onEventListItemClick}
              />
            </div>
          </Tab>
        </Tabs>
        <Drawer
          docked
          open
          containerStyle={{ zIndex: zIndex.drawer - 100, width: '28%', marginTop: '108px' }}
        >
          <Card style={{ paddingBottom: '25px' }}>
            <Avatar size={25} className="img-responsive center-block" style={{ minWidth: '0%', width: '150px', height: '150px', marginLeft: '125px', marginTop: '25px' }}
              src={this.props.user.fbProfPicUrl} alt="avatar"
            />
            <p style={{ textAlign: 'center', marginTop: '20px', color: '#5a7391', fontSize: '25px', fontWeight: 600, marginBottom: '7px' }} >{this.props.user.userInfo[0].name}</p>
          </Card>
          <Menu>
            <MenuItem primaryText="Change Picture" leftIcon={<RefreshNavigation />} />
            <MenuItem primaryText="Logout" leftIcon={<CancelNavigation />} onTouchTap={this.logout} />
          </Menu>
        </Drawer>
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
