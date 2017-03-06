// add_event_page_2.js

import React, { Component } from 'react';
import DateTime from 'react-datetime';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';


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

  handleChangeDate = (event, date) => {
    this.setState({ date: date });
    console.log(date);
  };

  handleChangeStartTime = (event, time) => {
    this.setState({ start_time: time });
    console.log(time);
  };

  handleChangeEndTime = (event, time) => {
    this.setState({ end_time: time });
    console.log(time);
  };

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

    const today = new Date();

    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          <div className="add-event-field-container-2">
            <br />
            <div display="inline-block">
              Date:
              <DatePicker
                hintText="Select event date"
                value={this.state.date}
                minDate={today}
                onChange={this.handleChangeDate}
              />
            </div>
          </div>
          <div className="add-event-field-container-2">
            Start time:
            <TimePicker
              hintText="Select start time"
              value={this.state.start_time}
              onChange={this.handleChangeStartTime}
            />
          </div>
          <div className="add-event-field-container-2">
            End time:
            <TimePicker
              hintText="Select end time"
              value={this.state.end_time}
              onChange={this.handleChangeEndTime}
            />
          </div>
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
