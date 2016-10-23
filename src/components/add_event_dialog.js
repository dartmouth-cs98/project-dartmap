// add_event_dialog.js
import React, { Component } from 'react';

import AddEventPage1 from './add_events/add_event_page_1';
import AddEventPage2 from './add_events/add_event_page_2';
import AddEventPage3 from './add_events/add_event_page_3';

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
    if (this.props.addEvent && (this.currentPage < 1 || this.currentPage > 3)) {
      this.currentPage = 1;
    }
    this.handlePageData = this.handlePageData.bind(this);
    this.submitEventData = this.submitEventData.bind(this);
    this.pageCode = [
      <AddEventPage1 handleData={this.handlePageData} />,
      <AddEventPage2 handleData={this.handlePageData} />,
      <AddEventPage3 handleData={this.handlePageData} />,
    ];
  }
  handlePageData(data) {
    console.log('data returned from the page: ' + this.currentPage);
    console.log(data);
    this.setState(data);
    this.currentPage += 1;
  }
  submitEventData() {
    this.currentPage = 0;
    this.props.handleAddEventData(this.state);
  }
  render() {
    if (this.props.addEvent) {
      console.log(this.currentPage);
      if (this.currentPage > 2) {
        return (
          <div id="add-event">
            <h1>Submit event</h1>
            {JSON.stringify(this.state)}
            <button type="button" onClick={this.submitEventData}>Submit</button>
          </div>
        );
      }
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
