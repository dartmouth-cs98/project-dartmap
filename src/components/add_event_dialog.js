// add_event_dialog.js
import React, { Component } from 'react';

import AddEvent1 from './add_events/add_event_1';
import AddEvent2 from './add_events/add_event_2';
import AddEvent3 from './add_events/add_event_3';

class AddEventDialog extends Component {
  constructor(props) {
    super(props);
    this.currentPage = 0;
    this.state = {
      name: '',
      organizer: '',
      description: '',
      date: null,
      start_time: null,
      end_time: null,
      location_string: '',
      location: null,
    };
    if (this.props.addEvent && this.currentPage === 0) {
      this.currentPage = 1;
    }
  }

  render() {
    if (this.currentPage === 1) {
      return (
        <div id="add-event">
          <h1>Add new event</h1>
          <AddEvent1 />
        </div>
      );
    }
    if (this.currentPage === 2) {
      return (
        <div id="add-event">
          <h1>Add new event</h1>
          <AddEvent2 />
        </div>
      );
    }
    if (this.currentPage === 3) {
      return (
        <div id="add-event">
          <h1>Add new event</h1>
          <AddEvent3 />
        </div>
      );
    }
    return (
      <div className="hidden">This is the hidden add Event Dialog</div>
    );
  }
}

export default AddEventDialog;
