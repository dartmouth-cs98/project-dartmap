// event_page.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';

import { Divider, Tabs, Tab, RaisedButton, Avatar, List, ListItem, CircularProgress } from 'material-ui';

import { postRSVP, deleteRSVP } from '../helpers/dartmap-api';
import CommentBox from './live_feed/comment_dialog';

// import redux actions
import { fetchEvent } from '../actions';

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
    this.handleRSVP = this.handleRSVP.bind(this);
    this.getInitialRSVP = this.getInitialRSVP.bind(this);
    this.getAllRSVPs = this.getAllRSVPs.bind(this);
    this.addImage = this.addImage.bind(this);

    if (!window.google) { // Load google maps api onto the page
      loadGoogleApi();
    }
    this.loadMap = this.loadMap.bind(this);
  }

  componentWillMount() {
    const id = parseInt(this.props.params.id, 10);
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
  }

  componentDidMount() {
    if (window.google && this.state.event && !this.map) {
      this.loadMap();
    }
  }

  componentWillUpdate() {
    const id = parseInt(this.props.params.id, 10);
    if ((!this.state.event) || (this.state.event.id !== id)) {
      if (this.props.currentEvent && this.props.currentEvent.id === id) {
        this.setState({ event: this.props.currentEvent });
      }
    }
  }

  componentDidUpdate() {
    if (window.google && this.state.event && !this.map) {
      this.getInitialRSVP();
      this.loadMap();
    }
  }

  getInitialRSVP() {
    if (this.state.event !== undefined && this.state.event !== null
      && this.state.event.attendees.length !== 0
      && this.state.isRSVPed === false) {
      let i;
      for (i = 0; i < this.state.event.attendees.length; i += 1) {
        if (this.state.event.attendees[i].id === 1) {
          this.setState({
            isRSVPed: true,
          });
          break;
        }
      }
    }
  }

  getAllRSVPs() {
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

  handleRSVP() {
    const data = {};
    data.user_id = 1;
    data.event_id = this.state.event_id;

    if (this.state.isRSVPed === true) { // De-RSVP
      deleteRSVP(data).then((response) => {
        this.setState({ isRSVPed: !this.state.isRSVPed });
      });
    } else { // RSVP
      postRSVP(data).then((response) => {
        this.setState({ isRSVPed: !this.state.isRSVPed });
      });
    }
  }

  addImage() {
    const data = {};
    data.user_id = 1;
    data.event_id = this.state.event_id;

    if (this.state.isRSVPed === true) { // De-RSVP
      deleteRSVP(data).then((response) => {
        this.setState({ isRSVPed: !this.state.isRSVPed });
      });
    } else { // RSVP
      postRSVP(data).then((response) => {
        this.setState({ isRSVPed: !this.state.isRSVPed });
      });
    }
  }

  loadMap() {
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
      button: {
        margin: 12,
      },
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
      },
      dividerStyle: {
        marginTop: 20,
        marginBottom: 20,
      },
      progress: {
        width: 150,
        height: 150,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -75,
        marginTop: -75,
      },
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
    const dateString = this.state.event.date.format('dddd MMMM Do YYYY');
    const startString = this.state.event.start_time.format('h:mma');
    const endString = this.state.event.end_time.format('h:mma');
    const categoryString = this.state.event.categories.map((cat) => {
      return cat.name;
    }).join(', ');

    return (
      <div>
        <Tabs>
          <Tab label="About" href="#About" />
          <Tab label="Who is Going" href="#Going" />
          <Tab label="Images" href="#Images" />
          <Tab label="Location" href="#Location" />
          <Tab label="Live" href="#LiveFeed" />
        </Tabs>
        <div className="container">
          <div id="About">
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
          <div id="Going">
            <div className="row">
              <h2 className="col-md-3">Who Is Going?</h2>
              <div className="pull-right" style={styles.button}>
                <RaisedButton label={this.state.isRSVPed ? 'Going' : 'RSVP'} primary onClick={this.handleRSVP} />
              </div>
            </div>
            <List>
              {this.getAllRSVPs()}
            </List>
          </div>
          <Divider style={styles.dividerStyle} />
          <div id="Images">
            <div className="row">
              <h2 className="col-md-6">Images</h2>
            </div>
            <div className="center-align">
              <ImageGallery
                items={images}
                autoPlay
                slideInterval={2000}
              />
            </div>
          </div>
          <Divider style={styles.dividerStyle} />
          <div id="Location">
            <div className="row">
              <h2 className="col-md-6">Location Details</h2>
            </div>
            <div className="row">
              <div id="evpg-map" />
              <div className="evpg-description">
                <em>Description: </em>
                {this.state.event.description}
              </div>
              <div className="evpg-organizer">
                <em>Organized by: </em>
                {this.state.event.organizer}
              </div>
              <div className="evpg-categories">
                <em>Categories: </em>
                {categoryString}
              </div>
            </div>
          </div>
          <Divider style={styles.dividerStyle} />
          <div id="LiveFeed">
            <div className="row">
              <h2 className="col-md-6">Live</h2>
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
  }
);

export default connect(mapStateToProps, { fetchEvent })(EventPage);
