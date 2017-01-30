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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSelectedLocation = this.handleSelectedLocation.bind(this);
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
    this.gMaps = null;
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

  componentDidMount() {
    const mapHTML = document.getElementById('add-event-map');
    const searchHTML = document.getElementById('map-search-box');
    this.gMaps = (window.google && window.google.maps);
    this.map = new this.gMaps.Map(mapHTML, { center: this.state.center, zoom: 15 });
    this.map.addListener('click', (event) => {
      console.log(event.latLng.lat(), event.latLng.lng());
    });
    this.gPlaces = new this.gMaps.places.PlacesService(this.map);
    this.gPlaces.nearbySearch({ location: this.state.center, radius: 100 }, (result) => { console.log(result); });
    this.textBox = new this.gMaps.places.Autocomplete(searchHTML);
    this.textBox.bindTo('bounds', this.map);
    this.textBox.addListener('place_changed', (event) => {
      console.log(this.textBox.getPlace());
    });
    console.log(this.map, this.gPlaces);
  }

  render() {
    // const locationErrorMessage = (this.state.location === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    // const roomErrorMessage = (this.state.location_string === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    // const mapHeight = '300px';
    // const mapWidth = '300px';
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          <div id="add-event-map" />
          <h2>Location String TEMP!!!:*</h2>
          <input
            id="map-search-box"
            type="text"
            placeholder="e.g. hi"
            value={this.state.loc_tmp || ''}
            onChange={(event) => {
              this.setState({ loc_tmp: event.target.value });
            }}
            className={(this.state.loc_tmp !== '') ? 'add-event-text add-event-loc-string' : 'add-event-text add-event-loc-string error-box'}
          />
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
