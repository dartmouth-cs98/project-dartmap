// add_event_page_3.js
import React, { Component } from 'react';
// import MapContainer from '../map_container';
// import { nearbyMapSearch, textSearch, autoCompleteSearch } from '../../helpers/google-places-api';


class AddEventPage3 extends Component {
  static nullFunction() {}
  constructor(props) {
    super(props);
    this.state = {
      location_obj: props.data.location_obj,
      loc_tmp: null,
      c: [43.703337, -72.288578],
      center: { lat: 43.703337, lng: -72.288578 },
      nearby_loc: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSelectedLocation = this.handleSelectedLocation.bind(this);
    this.nearbySearch = this.nearbySearch.bind(this);
    this.createMarker = this.createMarker.bind(this);
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
    this.gMaps = (window.google && window.google.maps);
    this.infoWindow = null;
    this.marker = null;
    this.markers = [];
  }

  componentDidMount() {
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
    this.map.addListener('click', (event) => {
      console.log(event.latLng.lat(), event.latLng.lng());
      // this.nearbySearch(event.latLng);
    });
    this.map.addListener('bounds_changed', (event) => {
      this.nearbySearch(this.map.getBounds());
    //   // const bounds = this.map.getBounds();
    //   this.textBox.setBounds(this.map.getBounds());
    //   // console.log(bounds);
    //   // console.log(typeof bounds);
    //   // if (bounds) {
    //   //   this.nearbySearch(bounds);
    //   // }
    });
    this.textBox.addListener('place_changed', (event) => {
      const place = this.textBox.getPlace();
      if (this.marker) {
        this.marker.setVisible(false);
      } else {
        this.marker = new this.gMaps.Marker({
          map: this.map,
          position: place.geometry.location,
        });
        this.marker.setVisible(false);
      }
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
      this.marker.setVisible(true);
    });
  }

  nearbySearch(bounds) {
    this.gPlaces.nearbySearch({ bounds },
      (result) => {
        console.log(result);
        this.setState({ nearby_loc: result });
        for (let i = 0; i < result.length; i += 1) {
          const marker = this.createMarker(result[i].name, result[i].geometry.location);
          this.markers.push(marker);
          // new this.gMaps.Marker({
          //   map: this.map,
          //   position: result[i].geometry.location,
          // });
          // this.gMaps.event.addListener(marker, 'click', function callback() {
          //   infoWindow.setContent(result[i].name);
          //   infoWindow.open(map, this);
          // });
        }
      }
    );
  }

  createMarker(name, location) {
    const infoWindow = this.infoWindow;
    const map = this.map;
    const marker = new this.gMaps.Marker({
      map: this.map,
      position: location,
    });
    this.gMaps.event.addListener(marker, 'click', function callback() {
      infoWindow.setContent(name);
      infoWindow.open(map, this);
    });
    return marker;
  }

  handleBack(event) {
    const data = {
      location_obj: this.state.location_obj,
      currentPage: this.props.currentPage - 1,
    };
    this.props.handleData(data);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.location_obj) {
      const data = {
        location_obj: this.state.location_obj,
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
    // const locationErrorMessage = (this.state.location === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    // const roomErrorMessage = (this.state.location_string === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    // const mapHeight = '300px';
    // const mapWidth = '300px';
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          <input
            id="map-search-box"
            type="text"
            placeholder="Search for or select location"
            value={this.state.loc_tmp || ''}
            onChange={(event) => {
              this.setState({ loc_tmp: event.target.value });
            }}
            className={(this.state.loc_tmp !== '') ? 'add-event-text add-event-loc-string' : 'add-event-text add-event-loc-string error-box'}
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
            className={(!this.state.location_obj) ? 'invalid-nxt-btn add-event-btn nxt-btn' : 'nxt-btn add-event-btn'}
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
