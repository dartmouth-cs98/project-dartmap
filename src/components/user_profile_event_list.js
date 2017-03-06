// event_list.js
import React, { Component } from 'react';

import { List, TextField } from 'material-ui';

import UserEventListItem from './user_profile_event_list_item';

class UserEventList extends Component {
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

    if (this.props.events && this.props.events.length > 0) {
      // FOR EACH EVENT
      for (let i = 0; i < this.props.events.length; i += 1) {
        const event = this.props.events[i];
        const eListItem = [<UserEventListItem
          event={event}
          // selectedLocation={this.props.selectedLocation}
          key={event.id}
          // showBalloon={this.props.showBalloon}
          // onEventListItemClick={this.props.onEventListItemClick}
        />];
        if (i >= 1) {
          this.isSameDay = this.prevDate.isSame(event.date);
        }
        if (i === 0 || (i >= 1 && !this.isSameDay)) {
          this.eventItems.push(
            <div className="user-date-display" key={'date'.concat(i)}>
              {event.date.format('ddd MM/DD/YYYY')}
            </div>
          );
        }
        this.eventItems.push(eListItem);
        this.prevDate = event.date;
      }

      // SEARCHING
      const searchString = this.state.searchString.trim().toLowerCase();
      if (searchString.length > 0) {
        console.log(this.eventItems);
        this.eventItems = this.eventItems.filter(i => ((i.constructor !== Array)
          ? null : i[0].props.event.name.toLowerCase().match(searchString)));
      }

      // Case of matching events (i.e. if there are events to be displayed)
      if (this.eventItems.length > 0) {
        return (
          <div>
            <TextField value={this.state.searchString} onChange={this.handleChange} placeholder="Search here..." />
            <List>
              {this.eventItems}
            </List>
          </div>
        );
      }
    }
    // Case of no matching events (i.e. if there are no events to be displayed)
    return (
      <div>
        <TextField value={this.state.searchString} onChange={this.handleChange} placeholder="Search here..." />
        <text className="warning-msg">
          No Matching Events. <br />
          Please Try Again.
        </text>
      </div>
    );
  }
}

export default UserEventList;
