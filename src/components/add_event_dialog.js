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
    this.handlePageData = this.handlePageData.bind(this);
    this.pageCode = [
      <div className="hidden">This is hidden.</div>,
      <AddEvent1 handleData={this.handlePageData} />,
      <AddEvent2 handleData={this.handlePageData} />,
      <AddEvent3 handleData={this.handlePageData} />,
    ];
  }
  handlePageData(data) {
    console.log('data returned from the page: ' + this.currentPage);
    console.log(data);
    this.setState(data);
    this.currentPage += 1;
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
