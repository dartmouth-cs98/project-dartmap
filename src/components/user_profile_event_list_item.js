// event_list_item.js
import React, { Component } from 'react';
import DateTime from 'react-datetime';
import Select from 'react-select';
import { deleteEvent, updateEvent } from '../helpers/dartmap-api';

// import helper functions
import {
  createMap, createMarker, createInfoWindow, loadGoogleApi,
} from '../helpers/google-maps';

const CATEGORIES = [
  { label: 'Academic', value: 'Academic' },
  { label: 'Art', value: 'Art' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Performance', value: 'Performance' },
  { label: 'Lecture', value: 'Lecture' },
  { label: 'Greek Life', value: 'Greek Life' },
  { label: 'Free Food', value: 'Free Food' },
];

class UserEventListItem extends Component {
  constructor(props) {
    super(props);
    this.selectedCategories = [];
    for (let i = 0; i < this.props.event.categories.length; i += 1) {
      const cat = this.props.event.categories[i];
      const catLabel = cat.name;
      const catValue = cat.name;
      this.selectedCategories.push({ label: catLabel, value: catValue });
    }
    let catString = '';
    for (let i = 0; i < this.props.event.categories.length; i += 1) {
      if (i !== 0) {
        catString += ', ' + this.props.event.categories[i].name;
      } else {
        catString += this.props.event.categories[i].name;
      }
    }
    this.state = {
      editing: false,
      editEventButtonText: 'Edit',
      // selectedMarker: null,
      eventName: this.props.event.name,
      eventOrganizer: this.props.event.organizer,
      eventDescription: this.props.event.description,
      eventStartTime: this.props.event.start_time,
      eventEndTime: this.props.event.end_time,
      eventLocation: this.props.event.location_name,
      eventCategories: this.selectedCategories,
      eventCategoriesString: catString,
      eventLocationLng: this.props.event.lng,
      eventLocationLat: this.props.event.lat,
      eventLocationName: this.props.event.location_name,
      eventIconUrl: this.props.event.icon_url,
    };
    this.map = null;
    this.marker = null;
    // this.editMap = null;
    // this.gPlaces = null;
    // this.gMaps = this.gMaps || (window.google && window.google.maps);
    // this.infoWindow = null;
    // this.editMarker = null;
    // this.editMarkers = [];
    // this.infoWindow = null;
    this.confirmDelete = this.confirmDelete.bind(this);
    this.editingEvent = this.editingEvent.bind(this);
    this.isValidTime = this.isValidTime.bind(this);
    this.handleCategChange = this.handleCategChange.bind(this);
    if (!window.google) { // Load google maps api onto the page
      loadGoogleApi();
    }
    this.loadMap = this.loadMap.bind(this);
    // this.loadEditMap = this.loadEditMap.bind(this);
  }

  componentDidMount() {
    if (window.google && this.props.event && !this.map) {
      this.loadMap();
    }
  }

  componentDidUpdate() {
    if (window.google && this.props.event && !this.map) {
      this.loadMap();
    }
  }

  confirmDelete() {
    const r = confirm('Are you sure you want to delete this event?');
    if (r === true) {
      deleteEvent(this.props.event.id);
    }
  }

  editingEvent() {
    console.log('this.state');
    console.log(this.state);
    if (this.state.editing === true) {
      this.setState({
        editing: false,
        editEventButtonText: 'Edit',
      });
      const toSend = {};
      toSend.name = this.state.eventName;
      toSend.organizer = this.state.eventOrganizer;
      toSend.description = this.state.eventDescription;
      toSend.start_time = this.state.eventStartTime._i;
      toSend.end_time = this.state.eventEndTime._i;
      toSend.location_name = this.state.eventLocation;
      // format the categories to send
      let catsToSend = '';
      for (let i = 0; i < this.state.eventCategories.length; i += 1) {
        if (i !== 0) {
          catsToSend += ', ';
        }
        catsToSend += this.state.eventCategories[i].value;
        toSend.categories = catsToSend;
      }
      console.log('toSend:');
      console.log(toSend);
      updateEvent(this.props.event.id, toSend);
      // update string of categories
      this.setState({ eventCategoriesString: catsToSend });
      alert('Event updated!');
    } else {
      this.setState({
        editing: true,
        editEventButtonText: 'Save',
      });
      // this.loadEditMap();
    }
  }

  isValidTime() {
    if (!this.state.eventStartTime) {
      return true;
    }
    if (!this.state.eventEndTime) {
      return true;
    }
    return (this.state.eventStartTime) && (this.state.eventEndTime) && this.state.eventEndTime.isAfter(this.state.eventStartTime);
  }

  // onCategoryChange(selectedCategories) {
  //   this.setState({ eventCategories: selectedCategories });
  // }

  handleCategChange(value) {
    this.setState({ value });
    const cats = value.split(',');
    console.log(cats.length);
    const obj = [];
    for (let i = 0; i < cats.length; ++i) {
      if (cats[i] != undefined) {
        const singleObj = {};
        let id;
        if (cats[i] === 'Academic') id = 1;
        if (cats[i] === 'Art') id = 2;
        if (cats[i] === 'Sports') id = 3;
        if (cats[i] === 'Performance') id = 4;
        if (cats[i] === 'Lecture') id = 5;
        if (cats[i] === 'Greek Life') id = 6;
        if (cats[i] === 'Free Food') id = 7;
        singleObj.id = id;
        singleObj.name = cats[i];
        obj.push(singleObj);
      }
    }
    this.setState({ eventCategories: obj });
  }

  loadMap() {
    if (!this.map) {
      const mapHTML = document.getElementById('uspg-map-' + this.props.event.id);
      const location = {
        lng: this.state.eventLocationLng,
        lat: this.state.eventLocationLat,
      };
      const locationName = this.state.eventLocationName;
      const iconUrl = this.state.eventIconUrl;
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

  // loadEditMap() {
  //   this.gMaps = this.gMaps || (window.google && window.google.maps);
  //   const mapHTML = document.getElementById('add-event-map');
  //   const searchHTML = document.getElementById('map-search-box');
  //   const location = {
  //     lng: this.state.eventLocationLng,
  //     lat: this.state.eventLocationLat,
  //   };
  //   this.editMap = new this.gMaps.Map(mapHTML, {
  //     center: location,
  //     zoom: 15,
  //     streetViewControl: false,
  //     fullscreenControl: false,
  //     mapTypeControl: false,
  //   });
  //   this.infoWindow = new this.gMaps.InfoWindow();
  //   this.gPlaces = new this.gMaps.places.PlacesService(this.editMap);
  //   this.textBox = new this.gMaps.places.Autocomplete(searchHTML);
  //   this.textBox.bindTo('bounds', this.editMap);

  //   // adding a listener so that every time the map moves, we do a search
  //   this.editMap.addListener('bounds_changed', (event) => {
  //     this.nearbySearch(this.editMap.getBounds());
  //   });

  //   // adding a listener so that when the user selects a location in the
  //   // search box, the relevant marker & bubble appear on the map
  //   this.textBox.addListener('place_changed', (event) => {
  //     const place = this.textBox.getPlace();
  //     while (this.editMarkers.length > 0) {
  //       this.editMarkers[0].setVisible(false);
  //       this.editMarkers.shift();
  //     }
  //     if (!this.editMarker) {
  //       this.editMarker = new this.gMaps.Marker({
  //         map: this.editMap,
  //         position: place.geometry.location,
  //       });
  //     }
  //     this.editMarker.setVisible(false);
  //     if (!place.geometry) {
  //       // User entered the name of a Place that was not suggested and
  //       // pressed the Enter key, or the Place Details request failed.
  //       const alertText = `No details available for input: '${place.name}'`;
  //       window.alert(alertText);
  //     }
  //     // If the place has a geometry, then present it on a map.
  //     if (place.geometry.viewport) {
  //       this.editMap.fitBounds(place.geometry.viewport);
  //     } else {
  //       this.editMap.setCenter(place.geometry.location);
  //       this.editMap.setZoom(17);  // Why 17? Because it looks good.
  //     }
  //     this.editMarker.setPosition(place.geometry.location);
  //     this.createInfoWindow(place.name, this.editMarker);
  //     const pos = this.editMarker.getPosition();
  //     this.setState({
  //       selectedMarker: this.editMarker,
  //       location: {
  //         placeId: place.place_id,
  //         name: place.name,
  //         lat: pos.lat(),
  //         lng: pos.lng(),
  //       },
  //     });
  //     this.editMarker.setVisible(true);
  //   });
  // }

  // nearbySearch = (bounds) => {
  //   this.gPlaces.nearbySearch({ bounds },
  //     (result) => {
  //       if (result) {
  //         for (let i = 0; i < result.length; i += 1) {
  //           const editMarker = this.createMarker(result[i].name,
  //             result[i].geometry.location, result[i].place_id
  //           );
  //           this.editMarkers.push(editMarker);
  //         }
  //       }
  //     }
  //   );
  // }

  // createMarker = (name, location, placeId) => {
  //   const marker = new this.gMaps.Marker({
  //     map: this.editMap,
  //     position: location,
  //   });
  //   this.gMaps.event.addListener(marker, 'click', () => {
  //     this.createInfoWindow(name, marker);
  //     const pos = marker.getPosition();
  //     this.setState({
  //       selectedMarker: marker,
  //       eventLocationLng: pos.lat(),
  //       eventLocationLat: pos.lng(),
  //       eventLocationName: name,
  //     });
  //   });
  //   return marker;
  // }

  // createInfoWindow = (name, marker) => {
  //   this.infoWindow.setContent(name);
  //   this.infoWindow.open(this.map, marker);
  // }


  render() {
    // this block of code builds the string to display the event's categories
    let categoriesStringLabel = 'Categor';
    if (this.props.event.categories.length === 1) {
      categoriesStringLabel += 'y:';
    } else {
      categoriesStringLabel += 'ies:';
    }

    let eventMap = null;
    let eventName = null;
    let eventTime = null;
    let eventLocation = null;
    let eventOrganizer = null;
    let eventCategories = null;
    let eventDescription = null;
    // if user is editing this event
    if (this.state.editing) {
      eventMap = (
        <div id={"uspg-map-" + this.props.event.id} className="uspg-map" />
        // <div className="add-event-fields">
          // <input
            // id="map-search-box"
            // type="text"
            // placeholder="Search for or select location"
            // value={(this.state.eventLocationLng && this.state.eventLocationName) || ''}
            // onChange={(event) => {
              // this.setState({ location: { name: event.target.value } });
            // }}
            // className="add-event-text add-event-loc-string"
          // />
          // <div id="add-event-map" />
        // </div>
      );
      eventName = (
        <input
          className="eventDetails"
          type="text"
          placeholder="*  Event name"
          defaultValue={this.state.eventName}
          onChange={event => this.setState({ eventName: event.target.value })}
        />
      );
      eventTime = (
        <div>
          <text className="attributeTitle">
            <br />Start Time:
          </text>
          <DateTime
            dateFormat={false}
            defaultValue={this.state.eventStartTime}
            value={this.state.eventStartTime}
            onChange={(moment) => { this.setState({ eventStartTime: moment }); console.log(moment); }}
            // className={((this.state.eventStartTime !== '') && this.isValidTime()) ? 'add-event-field add-event-time' : 'add-event-field add-event-time error-box'}
          />
          <text className="attributeTitle">
            <br />End Time:
          </text>
          <DateTime
            dateFormat={false}
            defaultValue={this.state.eventEndTime}
            value={this.state.eventEndTime}
            onChange={(moment) => { this.setState({ eventEndTime: moment }); }}
            // className={((this.props.event.start_time !== '') && this.isValidTime()) ? 'add-event-field add-event-time' : 'add-event-field add-event-time error-box'}
          />
        </div>
      );
      eventLocation = (
        <button className="user-change-event-location" type="button" onClick={this.confirmDelete}>
          Change location (this will eventually be replaced by Location/Room name)
        </button>
      );
      eventOrganizer = (
        <input
          className="eventDetails"
          type="text"
          placeholder="*  Event organizer"
          defaultValue={this.state.eventOrganizer}
          onChange={event => this.setState({ eventOrganizer: event.target.value })}
        />
      );
      eventCategories = (
        <Select multi joinValues
          options={CATEGORIES}
          value={this.state.eventCategories}
          onChange={categories => this.setState({ eventCategories: categories })}
        />
      );
      eventDescription = (
        <input
          className="eventDetails"
          type="text"
          placeholder="*  Event details"
          defaultValue={this.state.eventDescription}
          onChange={event => this.setState({ eventDescription: event.target.value })}
        />
      );
    } else {
      eventMap = (
        <div id={"uspg-map-" + this.props.event.id} className="uspg-map" />
      );
      eventName = (
        <h6 className="name">
          {this.state.eventName}
        </h6>
      );
      eventTime = (
        <text className="attribute">
          {this.state.eventStartTime.format('h:mm A')} ~ {this.state.eventEndTime.format('h:mm A')}<br />
        </text>
      );
      eventLocation = (
        <text className="attribute">
          {this.state.eventLocation}<br />
        </text>
      );
      eventOrganizer = (
        <text className="attribute">
          {this.state.eventOrganizer}<br />
        </text>
      );
      eventCategories = (
        <text className="attribute">
          {this.state.eventCategoriesString}<br />
        </text>
      );
      eventDescription = (
        <text className="attribute">
          {this.state.eventDescription}<br />
        </text>
      );
    }

    return (
      <div className="user-event-item">
        
        {eventMap}

        {eventName}

        <text className="attributeTitle">
          <br />Time:<br />
        </text>

        {eventTime}

        <text className="attributeTitle">
          <br />Location:
        </text>

        {eventLocation}

        <text className="attributeTitle">
          <br />Organizer:
        </text>

        {eventOrganizer}

        <text className="attributeTitle">
          <br />{categoriesStringLabel}
        </text>

        {eventCategories}

        <text className="attributeTitle">
          <br />Description:
        </text>

        {eventDescription}

        <text className="attributeTitle">
          <br />
        </text>
        <button className="user-delete-event" type="button" onClick={this.confirmDelete}>
          Delete
        </button>
        <button id="editEventButton" className="user-edit-event" type="button" onClick={this.editingEvent}>
          {this.state.editEventButtonText}
        </button>
      </div>
    );
  }
}

export default UserEventListItem;
