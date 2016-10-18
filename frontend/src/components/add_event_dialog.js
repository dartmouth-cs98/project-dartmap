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
      eventName: null,
      organizer: null,
      description: null,
      date: null,
      start_time: null,
      end_time: null,
      location_string: '',
      location: null,
    };
    if (this.props.addEvent && this.currentPage === 0) {
      this.currentPage = 1;
    }
    this.handlePage1Data = this.handlePage1Data.bind(this);
    this.handlePage2Data = this.handlePage2Data.bind(this);
    this.handlePage3Data = this.handlePage3Data.bind(this);
    this.pageCode = [
      <div className="hidden">This is hidden.</div>,
      <AddEvent1 handleData={this.handlePage1Data} />,
      <AddEvent2 handleData={this.handlePage2Data} />,
      <AddEvent3 handleData={this.handlePage3Data} />,
    ];
    this.currentPageCode = null;
  }
  handlePage1Data(data) {
    console.log('data returned from the first page:');
    console.log(data.eventName);
    console.log(data.organizer);
    this.setState({ eventName: data.eventName });
    this.setState({ organizer: data.organizer });
    this.setState({ description: data.description });
    console.log(this.state);
    this.currentPage = 2;
  }
  handlePage2Data(data) {
    this.currentPage = 3;
  }
  handlePage3Data(data) {
    this.currentPage = 4;
  }
  render() {
    if (this.props.addEvent) {
      return (
        <div id="add-event">
          <h1>Add new event</h1>
          {this.pageCode[this.currentPage]}
        </div>
      );
    }
    return (
      <div className="hidden">This is the hidden add Event Dialog</div>
    );
  }
}

export default AddEventDialog;
