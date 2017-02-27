// event_list_item.js
import React, { Component } from 'react';
import DateTime from 'react-datetime';
import { deleteEvent, updateEvent } from '../helpers/dartmap-api';

class UserEventListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editEventButtonText: 'Edit',
      eventName: this.props.event.name,
      eventOrganizer: this.props.event.organizer,
      eventDescription: this.props.event.description,
      eventStartTime: this.props.event.start_time,
      eventEndTime: this.props.event.end_time,
      eventLocation: this.props.event.location_name,
    };
    this.confirmDelete = this.confirmDelete.bind(this);
    this.editingEvent = this.editingEvent.bind(this);
    this.isValidTime = this.isValidTime.bind(this);
  }

  confirmDelete() {
    const r = confirm('Are you sure you want to delete this event?');
    if (r === true) {
      deleteEvent(this.props.event.id);
    }
  }

  editingEvent() {
    if (this.state.editing === true) {
      this.setState({
        editing: false,
        editEventButtonText: 'Edit',
      });
      const toSend = {};
      console.log('this.state.eventName');
      console.log(this.state.eventName);
      toSend.name = this.state.eventName;
      updateEvent(this.props.event.id, toSend);
      alert('Event updated!');
      console.log('TIMES');
      console.log(this.state.eventStartTime);
      console.log(this.state.eventEndTime);
    } else {
      this.setState({
        editing: true,
        editEventButtonText: 'Save',
      });
    }
    // TODO: need to set this up so it has a state so can change state so will re-render

    // console.log(document.getElementById('editEventButton'));
    // console.log(document.getElementById('editEventButton').value);
    // document.getElementById('editEventButton').value = 'hi hi hi';
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
            onChange={(moment) => { this.setState({ eventStartTime: moment }); }}
            // className={((this.state.eventStartTime !== '') && this.isValidTime()) ? 'add-event-field add-event-time' : 'add-event-field add-event-time error-box'}
          />
          <text className="attributeTitle">
            <br />End Time:
          </text>
          <DateTime
            dateFormat={false}
            defaultValue={this.state.eventEndTime}
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
        />
      );
      eventCategories = (
        <input
          className="eventDetails"
          type="text"
          placeholder="*  Event categories"
          defaultValue="THIS NEEDS TO BE A CATEGORY SELECTOR"
        />
      );
      eventDescription = (
        <input
          className="eventDetails"
          type="text"
          placeholder="*  Event details"
          defaultValue={this.state.eventDescription}
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
      <div className="user-event-item"
        // onClick={() => this.props.onEventListItemClick(this.props.event.id)}
      >

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
      </div>
    );
  }
}

export default UserEventListItem;
