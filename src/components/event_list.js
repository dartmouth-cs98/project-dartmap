// event_list.js
import React, { Component } from 'react';
import EventListItem from './event_list_item';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.isSameDay = false;
    this.prevDate = null;
    this.state = { searchString: '' };
  }
  handleChange = (e) => {
    this.setState({ searchString: e.target.value });
  };

  render() {
    this.eventItems = [];

    if (this.props.events.length > 0) {
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
          this.isSameDay = this.prevDate.isSame(event.date);
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

      const searchString = this.state.searchString.trim().toLowerCase();
      if (searchString.length > 0) {
        console.log(this.eventItems);
        this.eventItems = this.eventItems.filter(i => ((i.constructor !== Array)
          ? null : i[0].props.event.name.toLowerCase().match(searchString)));
      }

      // Case of matching events.
      if (this.eventItems.length > 0) {
        return (
          <div id="event-menu">
            <div className="add-event-btn-container">
              <button className="add-event-plus" type="button" onClick={this.props.toggleAddEvent}>
                Add Event
                <img id="plus" src="./../../icon_set_1/plus.png" role="presentation" />
              </button>
            </div>
            <input id="search-bar" type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here..." />
            {this.eventItems}
          </div>
        );
      }
    }
    // Case of no matching events.
    return (
      <div id="event-none">
        <div className="add-event-btn-container">
          <button className="add-event-plus" type="button" onClick={this.props.toggleAddEvent}>
            Add Event
            <img id="plus" src="./../../icon_set_1/plus.png" role="presentation" />
          </button>
        </div>
        <input id="search-bar" type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here..." />
        <text className="warning-msg">
          No Matching Events. <br />
          Please Try Again.
        </text>
      </div>
    );
  }
}

export default EventList;
