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
    this.state = {
      editing: false,
      editEventButtonText: 'Edit',
      eventName: this.props.event.name,
      eventOrganizer: this.props.event.organizer,
      eventDescription: this.props.event.description,
      eventStartTime: this.props.event.start_time,
      eventEndTime: this.props.event.end_time,
      eventLocation: this.props.event.location_name,
      eventCategories: this.selectedCategories,
    };
    // this.map = null;
    // this.marker = null;
    // this.infoWindow = null;
    this.confirmDelete = this.confirmDelete.bind(this);
    this.editingEvent = this.editingEvent.bind(this);
    this.isValidTime = this.isValidTime.bind(this);
    this.handleCategChange = this.handleCategChange.bind(this);
    // this.loadMap = this.loadMap.bind(this);
  }

  // loadMap() {
  //   if (!this.map) {
  //     const mapHTML = document.getElementById('evpg-map');
  //     const location = {
  //       lng: this.state.event.lng,
  //       lat: this.state.event.lat,
  //     };
  //     const locationName = this.state.event.location_name;
  //     const iconUrl = this.state.event.icon_url;
  //     const mapOptions = {
  //       center: location,
  //       zoom: 15,
  //       fullscreenControl: false,
  //       mapTypeControl: false,
  //     };
  //     const icon = {
  //       url: iconUrl,
  //       anchor: {
  //         x: 15,
  //         y: 15,
  //       },
  //       scaledSize: {
  //         height: 30,
  //         width: 30,
  //       },
  //     };
  //     this.map = createMap(mapHTML, mapOptions);
  //     this.marker = createMarker(this.map, location, icon);
  //     this.infoWindow = createInfoWindow(this.map, this.marker, locationName);
  //   }
  // }

  // componentDidMount() {
  //   if (window.google && this.props.event && !this.map) {
  //     this.loadMap();
  //   }
  // }

  // componentDidUpdate() {
  //   if (window.google && this.props.event && !this.map) {
  //     this.loadMap();
  //   }
  // }

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
          catsToSend += ',';
        }
        catsToSend += this.state.eventCategories[i].value;
        toSend.categories = catsToSend;
      }
      console.log('toSend:');
      console.log(toSend);
      updateEvent(this.props.event.id, toSend);
      alert('Event updated!');
    } else {
      this.setState({
        editing: true,
        editEventButtonText: 'Save',
      });
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
        const single_obj = {};
        let id;
        if (cats[i] === 'Academic') id = 1;
        if (cats[i] === 'Art') id = 2;
        if (cats[i] === 'Sports') id = 3;
        if (cats[i] === 'Performance') id = 4;
        if (cats[i] === 'Lecture') id = 5;
        if (cats[i] === 'Greek Life') id = 6;
        if (cats[i] === 'Free Food') id = 7;
        single_obj.id = id;
        single_obj.name = cats[i];
        obj.push(single_obj);
      }
    }
    this.setState({ eventCategories: obj });
  }



  render() {
    // this block of code builds the string to display the event's categories
    let categoriesStringLabel = 'Categor';
    if (this.props.event.categories.length === 1) {
      categoriesStringLabel += 'y:';
    } else {
      categoriesStringLabel += 'ies:';
    }

    let i;
    let categoriesString = '';
    for (i = 0; i < this.props.event.categories.length; i += 1) {
      if (i !== 0) {
        categoriesString += ', ' + this.props.event.categories[i].name;
      } else {
        categoriesString += this.props.event.categories[i].name;
      }
    }

    let eventName = null;
    let eventTime = null;
    let eventOrganizer = null;
    let eventCategories = null;
    let eventDescription = null;
    // if user is editing this event
    if (this.state.editing) {
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
            value = {this.state.eventEndTime}
            onChange={(moment) => { this.setState({ eventEndTime: moment }); }}
            // className={((this.props.event.start_time !== '') && this.isValidTime()) ? 'add-event-field add-event-time' : 'add-event-field add-event-time error-box'}
          />
        </div>
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
      eventOrganizer = (
        <text className="attribute">
          {this.state.eventOrganizer}<br />
        </text>
      );
      eventCategories = (
        <text className="attribute">
          {categoriesString}<br />
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

        {eventName}

        <text className="attributeTitle">
          <br />Time:<br />
        </text>

        {eventTime}

        <text className="attributeTitle">
          <br />Location:
        </text>
        <text className="attribute">
          {this.state.eventLocation}
        </text>
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
        <div id="evpg-map" />
      </div>
    );
  }
}

export default UserEventListItem;
