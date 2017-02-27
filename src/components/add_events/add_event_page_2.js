// add_event_page_2.js

import React, { Component } from 'react';
import DateTime from 'react-datetime';

class AddEventPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: props.data.start_time,
      end_time: props.data.end_time,
      date: props.data.date,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = ['date', 'start time', 'end time'].map((data) => {
      return <div key={data} className="error-msg"> The {data} of the event is required. </div>;
    });
    this.timeErrorMessage = <div className="error-msg"> The end time of the event must be after the start time. </div>;
    this.isValidTime = this.isValidTime.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.date && this.state.start_time && this.state.end_time && this.isValidTime()) {
      const data = {
        date: this.state.date,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        currentPage: this.props.currentPage + 1,
      };
      this.props.handleData(data);
    }
  }
  handleBack(event) {
    const data = {
      date: this.state.date,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      currentPage: this.props.currentPage - 1,
    };
    this.props.handleData(data);
  }
  isValidTime() {
    if (!this.state.start_time) {
      return true;
    }
    if (!this.state.end_time) {
      return true;
    }
    return (this.state.start_time) && (this.state.end_time) && this.state.end_time.isAfter(this.state.start_time);
  }
  render() {
    const dateErrorMessage = (this.state.date === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const startErrorMessage = (this.state.start_time === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    const endErrorMessage = (this.state.end_time === '') ? this.visibleErrorMessages[2] : this.hiddenErrorMessage;
    const timeErrorMessage = (this.isValidTime()) ? this.hiddenErrorMessage : this.timeErrorMessage;
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          <div className='add-event-field-container-2'>
            <h2>Date</h2>
            <DateTime
              timeFormat={false}
              value={this.state.date}
              onChange={(moment) => { this.setState({ date: moment }); }}
              closeOnSelect
              isValidDate={(current) => {
                // this function ensures that events cannot be created for dates before today
                const yesterday = DateTime.moment().subtract(1, 'day');
                return current.isAfter(yesterday);
              }}
              className={(this.state.date !== '') ? 'add-event-field add-event-date' : 'add-event-field add-event-date error-box'}
            />
          </div>
          {dateErrorMessage}
          <div className='add-event-field-container-2'>
            <h2>Start Time</h2>
            <DateTime
              dateFormat={false}
              value={this.state.start_time}
              onChange={(moment) => { this.setState({ start_time: moment }); }}
              className={((this.state.start_time !== '') && this.isValidTime()) ? 'add-event-field add-event-time' : 'add-event-field add-event-time error-box'}
            />
          </div>
          {startErrorMessage}
          <div className='add-event-field-container-2'>
            <h2>End Time</h2>
            <DateTime
              dateFormat={false}
              value={this.state.end_time}
              onChange={(moment) => { this.setState({ end_time: moment }); }}
              className={((this.state.end_time !== '') && this.isValidTime()) ? 'add-event-field add-event-time' : 'add-event-field add-event-time error-box'}
            />
          </div>
          {endErrorMessage}
          {timeErrorMessage}
        </div>
        <div className="add-event-btns">
          <input
            type="button"
            value="Back"
            onClick={(e) => { this.handleBack(e); }}
            className="back-btn add-event-btn"
          />
          <input
            type="submit"
            value="Next"
            className={(!this.state.date || !this.state.start_time || !this.state.end_time || !this.isValidTime()) ? 'invalid-nxt-btn nxt-btn add-event-btn' : 'nxt-btn add-event-btn'}
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage2;
