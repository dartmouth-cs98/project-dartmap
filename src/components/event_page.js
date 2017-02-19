// event_page.js
import React, { Component } from 'react';

import { getEvent } from '../helpers/dartmap-api';
import { createMap, createMarker, createInfoWindow } from '../helpers/google-maps';
import CommentBox from './comment_dialog';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      event_id: this.props.params.id,
    };
    this.map = null;
    this.marker = null;
    this.infoWindow = null;
  }

  componentWillMount() {
    getEvent((event) => {
      this.setState({ event });
    }, this.props.params.id);
  }

  componentDidUpdate() {
    console.log(this.state.event);
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
    if (!this.state.event) {
      return (
        <div>Loading. Please wait.</div>
      );
    }
    const dateString = this.state.event.date.format('dddd MMMM Do YYYY');
    const startString = this.state.event.start_time.format('h:mma');
    const endString = this.state.event.end_time.format('h:mma');
    const categoryString = this.state.event.categories.map((cat) => {
      return cat.name;
    }).join(', ');
    return (
      <div className="evpg-container">
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEV30fn0sPeqbZincSiNcHKDtmhH9omjI&libraries=places" />
        <div className="evpg-date">
          {dateString}
        </div>
        <div className="evpg-title">
          {this.state.event.name} @ {this.state.event.location_string}
        </div>
        <div className="evpg-subtitle evpg-time">
          {startString} - {endString}
        </div>
        <div className="col-md-12 evpg-image">
          <img src={this.state.event.image_url} alt="event-img" />
        </div>
        <div className="col-md-12 evpg-secondary">
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
        <CommentBox pollInterval={2000} event_id={this.state.event_id} />
      </div>
    );
  }
}

export default EventPage;
