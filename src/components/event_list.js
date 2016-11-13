// event_list.js
import React, { Component } from 'react';
import EventListItem from './event_list_item';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.isSameDay = false;
    this.prevDate = null;
  }
  render() {
    this.eventItems = [];
    if (this.props.events) {
      for (let i = 0; i < this.props.events.length; i += 1) {
        const event = this.props.events[i];
        const eListItem = [<EventListItem
          event={event}
          selectedLocation={this.props.selectedLocation}
          key={event.id}
          showBalloon={this.props.showBalloon}
          onEventListItemClick={this.props.onEventListItemClick}
        />];
        if (i >= 1) {
          this.isSameDay = this.prevDate === event.date;
        }
        if (i === 0 || (i >= 1 && !this.isSameDay)) {
          this.eventItems.push(
            <div className="date-display" key={'date'.concat(i)}>
              {event.date.format('ddd MM/DD/YYYY')}
            </div>
          );
        }
        this.eventItems.push(eListItem);
        this.prevDate = event.date;
      }
    }
    return (
      <div id="event-menu">
        {this.eventItems}
      </div>
    );
  }
}

export default EventList;
