// event_page.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
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
      event_id: this.props.params.id,
      isRSVPed: false,
    };
    this.map = null;
    this.marker = null;
    this.infoWindow = null;
    this.handleRSVP = this.handleRSVP.bind(this);
    this.getInitialRSVP = this.getInitialRSVP.bind(this);
    this.getAllRSVPs = this.getAllRSVPs.bind(this);

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
    if (this.state.event !== undefined && this.state.event !== null && this.state.event.attendees.length !== 0 && this.state.isRSVPed === false) {
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
    const names = this.props.currentEvent.attendees.map((attendee) => {
      return (
        <li className="list-group-item">
          {attendee.name}
        </li>
      );
    });
    return names;
  }

  handleRSVP() {
    const data = {};
    data.user_id = 1;
    data.event_id = parseInt(this.state.event_id, 10);

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
    const images = [];
    let i;
    if (!this.state.event) {
      return (
        <div>Loading. Please wait.</div>
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
      <div className="evpg-container">
        <div className="row">
          <div className="col-md-12">
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
          <div className="col-md-3 pull-right">
            <button type="button" onClick={this.handleRSVP}>{this.state.isRSVPed ? 'Going' : 'RSVP'}</button>
          </div>
        </div>
        <div className="list-group">
          {this.getAllRSVPs()}
        </div>
        <div className="evpg-image">
          <ImageGallery
            items={images}
            autoPlay
            slideInterval={2000}
          />
        </div>
        <div className="evpg-secondary">
          <div id="evpg-map" />
          <div className="evpg-text">
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
        <CommentBox pollInterval={1000} event_id={this.state.event_id} />
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
