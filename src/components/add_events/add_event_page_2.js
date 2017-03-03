// add_event_page_2.js

import React, { Component } from 'react';
import DateTime from 'react-datetime';
import RaisedButton from 'material-ui/RaisedButton';


class AddEventPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: props.data.start_time,
      end_time: props.data.end_time,
      date: props.data.date,
    };

    this.hiddenErrorMessage = <div className="hidden" />;
    const dataTypes = ['date', 'start time', 'end time'];
    this.visibleErrorMessages = dataTypes.map((data) => {
      return (
        <div key={data} className="error-msg">
          The {data} of the event is required.
        </div>
      );
    });
    this.timeErrorMessage = (
      <div className="error-msg">
        The end time of the event must be after the start time.
      </div>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValidSubmission()) {
      const data = {
        date: this.state.date,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        currentPage: this.props.currentPage + 1,
      };
      this.props.handleData(data);
    }
  }

  handleBack = (event) => {
    const data = {
      date: this.state.date,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      currentPage: this.props.currentPage - 1,
    };
    this.props.handleData(data);
  }

  isValidTime = () => {
    if (!this.state.start_time) {
      return true;
    }
    if (!this.state.end_time) {
      return true;
    }
    const start = DateTime.moment(this.state.start_time);
    const end = DateTime.moment(this.state.end_time);
    return (start) && (end) && end.isAfter(start);
  }

  isValidSubmission = () => {
    return (this.state.date && this.state.start_time &&
      this.state.end_time && this.isValidTime()
    );
  }

  render() {
    let dateErrorMessage = this.hiddenErrorMessage;
    let startErrorMessage = this.hiddenErrorMessage;
    let endErrorMessage = this.hiddenErrorMessage;
    let timeErrorMessage = this.hiddenErrorMessage;
    if (this.state.date === '') {
      dateErrorMessage = this.visibleErrorMessages[0];
    }
    if (this.state.start_time === '') {
      startErrorMessage = this.visibleErrorMessages[1];
    }
    if (this.state.end_time === '') {
      endErrorMessage = this.visibleErrorMessages[2];
    }
    if (!this.isValidTime()) {
      timeErrorMessage = this.timeErrorMessage;
    }
    const validClass = 'add-event-field';
    const errorClass = validClass.concat('error-box');
    const dateClassName = (this.state.date !== '') ? validClass : errorClass;
    let startClass = errorClass;
    let endClass = errorClass;
    if (this.isValidTime()) {
      startClass = (this.state.start_time !== '') ? validClass : errorClass;
      endClass = (this.state.end_time !== '') ? validClass : errorClass;
    }

    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          <div className="add-event-field-container-2">
            <h2>Date</h2>
            <DateTime
              timeFormat={false}
              value={this.state.date}
              onChange={(moment) => { this.setState({ date: moment }); }}
              closeOnSelect
              isValidDate={(current) => {
                // this ensures that events cannot be created for past dates
                const yesterday = DateTime.moment().subtract(1, 'day');
                return current.isAfter(yesterday);
              }}
              className={dateClassName.concat(' add-event-date')}
            />
          </div>
          {dateErrorMessage}
          <div className="add-event-field-container-2">
            <h2>Start Time</h2>
            <DateTime
              dateFormat={false}
              value={this.state.start_time}
              onChange={(moment) => { this.setState({ start_time: moment }); }}
              className={startClass.concat('add-event-time')}
            />
          </div>
          {startErrorMessage}
          <div className="add-event-field-container-2">
            <h2>End Time</h2>
            <DateTime
              dateFormat={false}
              value={this.state.end_time}
              onChange={(moment) => { this.setState({ end_time: moment }); }}
              className={endClass.concat('add-event-time')}
            />
          </div>
          {endErrorMessage}
          {timeErrorMessage}
        </div>
        <div className="add-event-btns">
          <RaisedButton
            label="Back"
            type="button"
            onClick={e => this.handleBack(e)}
            className="back-btn"
          />
          <RaisedButton
            label="Next"
            primary
            type="submit"
            disabled={!this.isValidSubmission()}
            className="nxt-btn"
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage2;
