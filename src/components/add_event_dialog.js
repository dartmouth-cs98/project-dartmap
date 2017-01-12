// add_event_dialog.js
// TODO: add validations to the slider so that you cannot go forward

import React, { Component } from 'react';

import AddEventPage1 from './add_events/add_event_page_1';
import AddEventPage2 from './add_events/add_event_page_2';
import AddEventPage3 from './add_events/add_event_page_3';
import AddEventPage4 from './add_events/add_event_page_4';
import AddEventPage5 from './add_events/add_event_page_5';
import AddEventSubmitPage from './add_events/add_event_submit_page';

import PageSlider from './add_events/add_event_page_slider';

class AddEventDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      organizer: null,
      description: null,
      date: null,
      start_time: null,
      end_time: null,
      location_string: null,
      location: null,
      categories: null,
      icon_url: null,
      currentPage: 0,
    };
    this.handlePageData = this.handlePageData.bind(this);
    this.submitEventData = this.submitEventData.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  resetState() {
    this.setState({
      name: null,
      organizer: null,
      description: null,
      date: null,
      start_time: null,
      end_time: null,
      location_string: null,
      location: null,
      categories: [],
      icon_url: null,
      currentPage: 0,
    });
  }
  handlePageData(data) {
    this.setState(data);
  }
  submitEventData() {
    const data = {
      name: this.state.name,
      organizer: this.state.organizer,
      description: this.state.description,
      date: this.state.date,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      location_string: this.state.location_string,
      location: this.state.location,
      icon_url: this.state.icon_url,
      categories: this.state.categories,
    };
    this.resetState();
    this.props.handleAddEventData(data);
  }
  handleClose() {
    this.resetState();
    this.props.closeAddEventDialog();
  }
  render() {
    const page1Data = { name: this.state.name, organizer: this.state.organizer, description: this.state.description };
    const page2Data = { date: this.state.date, start_time: this.state.start_time, end_time: this.state.end_time };
    const page3Data = { location: this.state.location, location_string: this.state.location_string };
    const page4Data = { categories: this.state.categories };
    const page5Data = { icon_url: this.state.icon_url };
    this.pageCode = [
      <AddEventPage1 currentPage={this.state.currentPage} data={page1Data} handleData={this.handlePageData} />,
      <AddEventPage2 currentPage={this.state.currentPage} data={page2Data} handleData={this.handlePageData} />,
      <AddEventPage3 currentPage={this.state.currentPage} data={page3Data} handleData={this.handlePageData} />,
      <AddEventPage4 currentPage={this.state.currentPage} data={page4Data} handleData={this.handlePageData} />,
      <AddEventPage5 currentPage={this.state.currentPage} data={page5Data} handleData={this.handlePageData} />,
      <AddEventSubmitPage data={this.state} submitEventData={this.submitEventData} />,
    ];

    if (this.props.addEvent) {
      return (
        <div id="add-event">
          <div className="add-event-top">
            <div>
              <h1>Add new event</h1>
              <div id="close-button" onClick={this.handleClose}>x</div>
            </div>
            <PageSlider currentPage={this.state.currentPage} numPages={this.pageCode.length - 1} />
          </div>
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
