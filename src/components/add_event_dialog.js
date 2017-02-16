// add_event_dialog.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddEventPage1 from './add_events/add_event_page_1';
import AddEventPage2 from './add_events/add_event_page_2';
import AddEventPage3 from './add_events/add_event_page_3';
import AddEventPage4 from './add_events/add_event_page_4';
import AddEventPage5 from './add_events/add_event_page_5';
import AddEventSubmitPage from './add_events/add_event_submit_page';

import PageSlider from './add_events/add_event_page_slider';

// import the redux actions
import { createEvent } from '../actions';

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
      location: null,
      location_string: null,
      categories: null,
      icon: null,
      currentPage: 0,
      image_url: ['https://s27.postimg.org/o2c50l3fn/default.png'],
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
      location: null,
      location_string: null,
      categories: [],
      icon: null,
      currentPage: 0,
      image_url: ['https://s27.postimg.org/o2c50l3fn/default.png'],
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
      location: this.state.location,
      location_string: this.state.location_string,
      icon_url: this.state.icon.url,
      categories: this.state.categories,
      image_url: this.state.image_url,
    };
    this.resetState();
    this.props.createEvent(data);
    this.props.handleAddEventData();
  }
  handleClose() {
    this.resetState();
    this.props.closeAddEventDialog();
  }
  render() {
    const page1Data = { name: this.state.name, organizer: this.state.organizer, description: this.state.description, location_string: this.state.location_string };
    const page2Data = { date: this.state.date, start_time: this.state.start_time, end_time: this.state.end_time };
    const page3Data = { location: this.state.location };
    const page4Data = { categories: this.state.categories };
    const page5Data = { icon: this.state.icon, image_url: this.state.image_url };
    this.pageCode = [
      <AddEventPage1 currentPage={this.state.currentPage} data={page1Data} handleData={this.handlePageData} />,
      <AddEventPage2 currentPage={this.state.currentPage} data={page2Data} handleData={this.handlePageData} />,
      <AddEventPage3 currentPage={this.state.currentPage} data={page3Data} handleData={this.handlePageData} />,
      <AddEventPage4 currentPage={this.state.currentPage} catList={this.props.catList} data={page4Data} handleData={this.handlePageData} />,
      <AddEventPage5 currentPage={this.state.currentPage} data={page5Data} handleData={this.handlePageData} />,
      <AddEventSubmitPage data={this.state} submitEventData={this.submitEventData} />,
    ];

    if (this.props.addEvent) {
      return (
        <div className="add-event-cover">
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
        </div>
      );
    }
    return (
      <div className="hidden">This is the hidden add Event Dialog</div>
    );
  }
}

export default connect(null, { createEvent })(AddEventDialog);
