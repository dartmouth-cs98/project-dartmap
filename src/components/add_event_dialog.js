// add_event_dialog.js
import React, { Component } from 'react';

import AddEventPage1 from './add_events/add_event_page_1';
import AddEventPage2 from './add_events/add_event_page_2';
import AddEventPage3 from './add_events/add_event_page_3';

import PageSlider from './add_event_page_slider';

class AddEventDialog extends Component {
  constructor(props) {
    super(props);
    // this.state.currentPage = 0;
    this.state = {
      name: null,
      organizer: null,
      description: null,
      date: null,
      start_time: null,
      end_time: null,
      location_string: '',
      location: null,
      currentPage: 0,
    };
    if (this.props.addEvent && (this.state.currentPage < 1 || this.state.currentPage > 3)) {
      this.state.currentPage = 1;
    }
    this.handlePageData = this.handlePageData.bind(this);
    this.submitEventData = this.submitEventData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.pageCode = [
      <AddEventPage1 handleData={this.handlePageData} />,
      <AddEventPage2 handleData={this.handlePageData} />,
      <AddEventPage3 handleData={this.handlePageData} />,
      <div id="add-event"><h1>Submit event</h1>{JSON.stringify(this.state)}<button type="button" onClick={this.submitEventData}>Submit</button></div>,
    ];
    this.didChange = false;
  }
  handlePageData(data) {
    this.didChange = true;
    this.setState(data);
    this.setState({ currentPage: this.state.currentPage + 1 });
  }
  submitEventData() {
    this.setState({ currentPage: 0 });
    this.props.handleAddEventData(this.state);
  }
  handlePageChange(pageNumber) {
    this.didChange = false;
    this.setState({ currentPage: pageNumber });
  }
  render() {
    if (this.props.addEvent) {
      return (
        <div id="add-event">
          <h1>Add new event</h1>
          <PageSlider handlePageChange={this.handlePageChange} didChange={this.didChange} currentPage={this.state.currentPage} />
          {this.pageCode[this.state.currentPage]}
        </div>
      );
    }
    return (
      <div className="hidden">This is the hidden add Event Dialog</div>
    );
  }
}

export default AddEventDialog;
