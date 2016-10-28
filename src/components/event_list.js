// event_list.js
import React, { Component } from 'react';
import EventListItem from './event_list_item';

class EventList extends Component {
  constructor(props) {
    super(props);
    if (props.events) {
      this.eventItems = props.events.map((event) => {
        return (
          <EventListItem event={event} selectedLocation={props.selectedLocation} key={event.id}
            showBalloon={props.showBalloon} showStickyBalloon={props.showStickyBalloon}
          />
        );
      });
    } else {
      this.eventItems = [];
    }
  }
  render() {
    return (
      <div id="event-menu">
        {this.eventItems}
      </div>
    );
  }
}

export default EventList;
