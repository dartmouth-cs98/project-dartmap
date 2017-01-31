// add_event_page_3.js
import React, { Component } from 'react';
// import MapContainer from '../map_container';
// import { nearbyMapSearch, textSearch, autoCompleteSearch } from '../../helpers/google-places-api';


class AddEventPage3 extends Component {
  // static nullFunction() {}
  constructor(props) {
    super(props);
    this.state = {
      location: props.data.location,
      selectedMarker: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSelectedLocation = this.handleSelectedLocation.bind(this);
    this.nearbySearch = this.nearbySearch.bind(this);
    this.createMarker = this.createMarker.bind(this);
    this.createInfoWindow = this.createInfoWindow.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = ['location'].map((data) => {
      return (
        <div key={data} className="error-msg">
          The {data} of the event is required.
        </div>
      );
    });
    this.map = null;
    this.gPlaces = null;
    this.gMaps = this.gMaps || (window.google && window.google.maps);
    this.infoWindow = null;
    this.marker = null;
    this.markers = [];
    this.placeChanged = false;
  }

  componentDidMount() {
    this.gMaps = this.gMaps || (window.google && window.google.maps);
    const mapHTML = document.getElementById('add-event-map');
    const searchHTML = document.getElementById('map-search-box');
    this.map = new this.gMaps.Map(mapHTML, {
      center: this.props.data.userLocation,
      zoom: 15,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
    });
    this.infoWindow = new this.gMaps.InfoWindow();
    this.gPlaces = new this.gMaps.places.PlacesService(this.map);
    this.textBox = new this.gMaps.places.Autocomplete(searchHTML);
    this.textBox.bindTo('bounds', this.map);

    // adding a listener so that every time the map moves, we do a search
    this.map.addListener('bounds_changed', (event) => {
      this.nearbySearch(this.map.getBounds());
    });

    // adding a listener so that when the user selects a location in the
    // search box, the relevant marker & bubble appear on the map
    this.textBox.addListener('place_changed', (event) => {
      const place = this.textBox.getPlace();
      while (this.markers.length > 0) {
        this.markers[0].setVisible(false);
        this.markers.shift();
      }
      if (!this.marker) {
        this.marker = new this.gMaps.Marker({
          map: this.map,
          position: place.geometry.location,
        });
      }
      this.marker.setVisible(false);
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No details available for input: \''.concat(place.name).concat('\''));
      }
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);  // Why 17? Because it looks good.
      }
      this.marker.setPosition(place.geometry.location);
      this.createInfoWindow(place.name, this.marker);
      const pos = this.marker.getPosition();
      this.setState({
        selectedMarker: this.marker,
        location: {
          placeId: place.place_id,
          name: place.name,
          lat: pos.lat(),
          lng: pos.lng(),
        },
      });
      this.marker.setVisible(true);
    });
  }

  nearbySearch(bounds) {
    this.gPlaces.nearbySearch({ bounds },
      (result) => {
        for (let i = 0; i < result.length; i += 1) {
          const marker = this.createMarker(result[i].name, result[i].geometry.location, result[i].place_id);
          this.markers.push(marker);
        }
      }
    );
  }

  createMarker(name, location, placeId) {
    const marker = new this.gMaps.Marker({
      map: this.map,
      position: location,
    });
    this.gMaps.event.addListener(marker, 'click', () => {
      this.createInfoWindow(name, marker);
      const pos = marker.getPosition();
      this.setState({
        selectedMarker: marker,
        location: {
          placeId,
          name,
          lat: pos.lat(),
          lng: pos.lng(),
        },
      });
    });
    return marker;
  }

  createInfoWindow(name, marker) {
    this.infoWindow.setContent(name);
    this.infoWindow.open(this.map, marker);
  }

  handleBack(event) {
    const data = {
      location: this.state.location,
      currentPage: this.props.currentPage - 1,
    };
    this.props.handleData(data);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.location) {
      const data = {
        location: this.state.location,
        currentPage: this.props.currentPage + 1,
      };
      this.props.handleData(data);
    }
  }

  handleSelectedLocation(data) {
    this.setState(data);
    console.log(data);
  }

  render() {
    const validNext = 'nxt-btn add-event-btn';
    const invalidNext = 'invalid-nxt-btn add-event-btn nxt-btn';
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          <input
            id="map-search-box"
            type="text"
            placeholder="Search for or select location"
            value={(this.state.location && this.state.location.name) || ''}
            onChange={(event) => {
              this.setState({ location: { name: event.target.value } });
            }}
            className="add-event-text add-event-loc-string"
          />
          <div id="add-event-map" />
        </div>
        <div className="add-event-btns">
          <input
            type="button"
            value="Back"
            onClick={(e) => { this.handleBack(e); }}
            className="back-btn add-event-btn"
          />
          <input
            type="submit"
            value="Next"
            className={(!this.state.location) ? invalidNext : validNext}
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage3;

// <MapContainer events={this.state.location_obj || []}
//   showBalloonEventId={this.nullFunction}
//   showStickyBalloonEventId={this.nullFunction}
//   height={mapHeight}
//   width={mapWidth}
//   handleSelectedLocation={this.handleSelectedLocation}
//   center={this.state.center}
// />
