// event_page.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';

import { Divider, Tabs, Tab, RaisedButton, Avatar, List, ListItem, CircularProgress } from 'material-ui';

import { postRSVP, deleteRSVP } from '../helpers/dartmap-api';
import CommentBox from './live_feed/comment_dialog';

// import redux actions
import { createRSVP, removeRSVP, getLoginStatusFromFb, fetchEvent } from '../actions';

// import helper functions
import {
  createMap, createMarker, createInfoWindow, loadGoogleApi,
} from '../helpers/google-maps';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      event_id: parseInt(this.props.params.id, 10),
      isRSVPed: false,
    };
    this.map = null;
    this.marker = null;
    this.infoWindow = null;
    this.initialRSVP = true;

    if (!window.google) { // Load google maps api onto the page
      loadGoogleApi();
    }
    this.loadMap = this.loadMap.bind(this);
  }

  componentWillMount() {
    const id = this.state.event_id;
    if (this.props.events && this.props.events.length > 0) {
      for (let i = 0; i < this.props.events.length; i += 1) {
        const event = this.props.events[i];
        if (event.id === id) {
          this.setState({ event });
          break;
        }
      }
      if (this.props.currentEvent && this.props.currentEvent.id === id) {
        this.setState({ event: this.props.currentEvent });
      }
    } else {
      this.props.fetchEvent(this.props.params.id);
    }
    this.getInitialRSVP();
  }

  componentDidMount() {
    if (window.google && this.state.event && !this.map) {
      this.getInitialRSVP();
      this.loadMap();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.getInitialRSVP();
    const id = parseInt(this.props.params.id, 10);
    if ((!nextState.event) || (nextState.event.id !== id)) {
      if (nextProps.currentEvent && nextProps.currentEvent.id === id) {
        this.setState({ event: nextProps.currentEvent });
      }
    }
  }

  componentDidUpdate() {
    if (window.google && this.state.event && !this.map) {
      this.loadMap();
    }
  }

  getInitialRSVP = () => {
    if (this.initialRSVP) {
      if (this.state.event !== undefined && this.state.event !== null
        && this.state.event.attendees.length !== 0
        && this.state.isRSVPed === false && this.props.user
        && this.props.user.userInfo && this.props.user.userInfo[0]) {
        this.initialRSVP = false;
        for (let i = 0; i < this.state.event.attendees.length; i += 1) {
          if (this.state.event.attendees && this.props.user.userInfo && this.state.event.attendees[i].id === this.props.user.userInfo[0].id) {
            this.setState({
              isRSVPed: true,
            });
            break;
          }
        }
      }
    }
  }

  getAllRSVPs = () => {
    let names;
    if (this.props.currentEvent) {
      names = this.props.currentEvent.attendees.map((attendee) => {
        return (
          <ListItem key={attendee.name}
            primaryText={attendee.name}
            leftAvatar={<Avatar src={attendee.picture} />}
          />
        );
      });
    }
    return names;
  }

  handleRSVP = () => {
    const data = {};
    data.user_id = this.props.user.userInfo[0].id;
    data.event_id = this.state.event_id;

    if (this.state.isRSVPed === true) { // De-RSVP
      this.props.removeRSVP(data, this.props.user.jwt);
      this.setState({ isRSVPed: false });
    } else { // RSVP
      this.props.createRSVP(data, this.props.user.jwt);
      this.setState({ isRSVPed: true });
    }
  }

  addImage = () => {
    const data = {};
    data.user_id = 1;
    data.event_id = this.state.event_id;

    if (this.state.isRSVPed === true) { // De-RSVP
      deleteRSVP(data, this.props.user.jwt).then((response) => {
        this.setState({ isRSVPed: !this.state.isRSVPed });
      });
    } else { // RSVP
      postRSVP(data, this.props.user.jwt).then((response) => {
        this.setState({ isRSVPed: !this.state.isRSVPed });
      });
    }
  }

  loadMap = () => {
    if (this.state.event && !this.map) {
      const mapHTML = document.getElementById('evpg-map');
      const location = {
        lng: this.state.event.lng,
        lat: this.state.event.lat,
      };
      const locationName = this.state.event.location_name;
      const iconUrl = this.state.event.icon_url;
      const mapOptions = {
        center: location,
        zoom: 15,
        fullscreenControl: false,
        mapTypeControl: false,
        scrollwheel: false,
      };
      const icon = {
        url: iconUrl,
        anchor: {
          x: 15,
          y: 15,
        },
        scaledSize: {
          height: 30,
          width: 30,
        },
      };
      this.map = createMap(mapHTML, mapOptions);
      this.marker = createMarker(this.map, location, icon);
      this.infoWindow = createInfoWindow(this.map, this.marker, locationName);
    }
  }

  render() {
    const styles = {
      button: { margin: 12 },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
      tabsStyle: {
        position: 'fixed',
        top: 0,
        width: '100%',
        marginTop: '60px',
        zIndex: 10,
      },
      dividerStyle: { marginTop: 20, marginBottom: 20 },
      progress: {
        width: 150,
        height: 150,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -75,
        marginTop: -75,
      },
      containerStyle: { marginTop: '108px' },
    };

    const images = [];
    let i;
    if (!this.state.event) {
      return (
        <div>
          <CircularProgress size={150} style={styles.progress} thickness={5} />
        </div>
      );
    }
    for (i = 0; i < this.state.event.image_url.length; i += 1) {
      images.push({ original: this.state.event.image_url[i],
        thumbnail: this.state.event.image_url[i],
        originalClass: 'gallery-image',
      });
    }
    let showGallery = false;
    if (images.length > 1) {
      showGallery = true;
    }
    const dateString = this.state.event.date.format('dddd, MMMM Do YYYY');
    const startString = this.state.event.start_time.format('h:mma');
    const endString = this.state.event.end_time.format('h:mma');
    const categoryString = this.state.event.categories.map((cat) => {
      return cat.name;
    }).join(', ');

    return (
      <div>
        <Tabs style={styles.tabsStyle}>
          <Tab label="About" href="#About" />
          <Tab label="Who is Going" href="#Going" />
          <Tab label="Images" href="#Images" />
          <Tab label="Details" href="#Details" />
          <Tab label="Location" href="#Location" />
          <Tab label="Comments" href="#LiveFeed" />
        </Tabs>
        <div className="container" style={styles.containerStyle}>
          <div className="anchor" id="About">
            <h2>About</h2>
            <div className="text-center">
              <div className="evpg-date">
                {dateString}
              </div>
              <div className="evpg-title">
                {this.state.event.name} @ {this.state.event.location_string}
              </div>
              <div className="evpg-subtitle evpg-time">
                {startString} - {endString}
              </div>
            </div>
          </div>
          <Divider style={styles.dividerStyle} />
          <div className="anchor" id="Going">
            <div className="row">
              <h2 className="col-md-3">Who Is Going?</h2>
              <div className={this.props.user.loggedIn ? 'pull-right' : 'pull-right hidden'} style={styles.button}>
                <RaisedButton label={this.state.isRSVPed ? 'Going' : 'RSVP'} primary onClick={this.handleRSVP} />
              </div>
            </div>
            <List>
              {this.getAllRSVPs()}
            </List>
          </div>
          <Divider style={styles.dividerStyle} />
          <div className="anchor" id="Images">
            <div className="row">
              <h2 className="col-md-6">Images</h2>
            </div>
            <div className="center-align">
              <ImageGallery
                items={images}
                autoPlay
                slideInterval={2000}
                showThumbnails={showGallery}
                showPlayButton={showGallery}
              />
            </div>
          </div>
          <Divider style={styles.dividerStyle} />
          <div className="anchor" id="Details">
            <div className="row">
              <h2 className="col-md-6">Details</h2>
            </div>
            <div style={{ marginLeft: '10px' }}>
              <div className="evpg-description">
                <h5 style={{ color: 'gray' }}>Description</h5>
                <div>{this.state.event.description}</div>
              </div>
              <div className="evpg-organizer">
                <h5 style={{ color: 'gray' }}>Organizer</h5>
                <div>{this.state.event.organizer}</div>
              </div>
              <div className="evpg-categories">
                <h5 style={{ color: 'gray' }}>Categories</h5>
                <div>{categoryString}</div>
              </div>
            </div>
          </div>
          <Divider style={styles.dividerStyle} />
          <div className="anchor" id="Location">
            <div className="row">
              <h2 className="col-md-6">Location</h2>
            </div>
            <div className="row">
              <div id="evpg-map" />
            </div>
          </div>
          <Divider style={styles.dividerStyle} />
          <div id="LiveFeed">
            <div className="row">
              <h2 className="col-md-6">Comments</h2>
            </div>
            <CommentBox pollInterval={1000} event_id={this.state.event_id} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    events: state.events.all,
    userLocation: {
      lat: state.user.latitude,
      lng: state.user.longitude,
    },
    currentEvent: state.events.currentEvent,
    user: state.user,
  }
);

export default connect(mapStateToProps, { createRSVP, removeRSVP, getLoginStatusFromFb, fetchEvent })(EventPage);
