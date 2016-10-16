// event_list.js
import React, { Component } from 'react';
import EventListItem from './event_list_item';

class EventList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>I am a list of events</p>
        <EventListItem />
      </div>
    );
  }
}

export default EventList;
