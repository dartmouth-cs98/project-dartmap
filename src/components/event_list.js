// event_list.js
import React, { Component } from 'react';
import EventListItem from './event_list_item';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.eventItems = [];
  }
  render() {
    if (this.props.events) {
      this.eventItems = this.props.events.map((event) => {
        return (
          <EventListItem
            event={event}
            selectedLocation={this.props.selectedLocation}
            key={event.id}
            showBalloon={this.props.showBalloon}
            onEventListItemClick={this.props.onEventListItemClick}
          />
        );
      });
    }
    return (
      <div id="event-menu">
        {this.eventItems}
      </div>
    );
  }
}

export default EventList;
