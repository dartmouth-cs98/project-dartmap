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

    if (this.props.events.length > 0) {
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

      // Case of matching events (i.e. if there are events to be displayed)
      if (this.eventItems.length > 0) {
        return (
          <div >
          <div style={{ width: '100%' }}>
            </div>
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
        <text className="warning-msg">
          No Matching Events. <br />
          Please Try Again.
        </text>
      </div>
    );
  }
}

export default UserEventList;
