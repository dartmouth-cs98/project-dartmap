// user_page.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab, Menu, MenuItem, Card, Avatar, Drawer } from 'material-ui';
import { zIndex } from 'material-ui/styles';
import CancelNavigation from 'material-ui/svg-icons/navigation/cancel';

// import the redux actions
import { fetchRSVPdEventsById, fetchUserEventsById, logout } from '../actions';

import UserEventList from './user_profile_event_list';

// import helper functions
import { sortDateTimeReverse } from '../helpers/date-time-filters-helper';
import { loadGoogleApi } from '../helpers/google-maps';

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadingPhoto: false,
    };
    if (!window.google) { // Load google maps api onto the page
      loadGoogleApi();
    }
  }

  // componentWillUpdate() {
  //   console.log('update', this.props.userInfo);
  //   if (!this.props.userInfo && window.FB) {
  //     console.log('logging in');
  //     this.props.getLoginStatusFromFb();
  //   }
  //   // if (nextProps.user !== this.props.user) {
  //   //   this.getSubmittedEvents();
  //   //   this.getRSVPEvents();
  //   // }
  // }

  onEventListItemClick = (eventId) => {
    console.log('Button clicked ', eventId);
  }

  getRSVPEvents = () => {
    if (this.props.user.userInfo && this.props.user.userInfo.constructor === Array) {
      const arr = this.props.user.userInfo[0].rsvpevents;
      // const idString = arr.toString();
      this.props.fetchRSVPdEventsById(arr.toString());
    }
  }

  getSubmittedEvents = () => {
    if (this.props.user.userInfo && this.props.user.userInfo.constructor === Array) {
      const arr = this.props.user.userInfo[0].createdevents;
      // const idString = arr.toString();
      this.props.fetchUserEventsById(arr.toString());
    }
  }

  logout = () => {
    this.props.logout();
    window.location.replace('../');
  }

  sortEventList = (eventList) => {
    if (eventList) {
      return eventList.sort(sortDateTimeReverse);
    } else {
      return eventList;
    }
  }

  render() {
    if (this.props.RSVPEvents === null || this.props.RSVPEvents === undefined) {
      console.log('fetching rsvps');
      this.getRSVPEvents();
      return null;
    }

    if (this.props.SubmittedEvents === null || this.props.SubmittedEvents === undefined) {
      this.getSubmittedEvents();
      return null;
    }
    console.log(this.props.user);
    return (
      <div>
        <Tabs style={{ position: 'static', top: 0, width: '100%', marginTop: '60px', zIndex: 5000 }}>
          <Tab label="Submitted Events" href="#SubmitEvents">
            <div className="user-event-list">
              <UserEventList
                events={this.sortEventList(this.props.SubmittedEvents)}
                onEventListItemClick={this.onEventListItemClick}
                eventListType="submitted"
              />
            </div>
          </Tab>
          <Tab label="RSVP'd Events" href="#RSVPEvents">
            <div className="user-event-list">
              <UserEventList
                events={this.sortEventList(this.props.RSVPEvents)}
                onEventListItemClick={this.onEventListItemClick}
                eventListType="rsvp"
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapDispatchToProps = { logout, fetchRSVPdEventsById, fetchUserEventsById };

const mapStateToProps = state => (
  {
    user: state.user,
    RSVPEvents: state.events.rsvps,
    SubmittedEvents: state.events.userEvents,
    userInfo: state.user && state.userInfo,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
