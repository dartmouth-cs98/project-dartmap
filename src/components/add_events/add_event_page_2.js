// add_event_page_2.js

// TODO: add validation to the end time so that it must be after the start time!!
import React, { Component } from 'react';
import DateTime from 'react-datetime';
import moment from 'moment';

class AddEventPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: moment(props.data.start_time, 'HH:mm'),
      end_time: moment(props.data.end_time, 'HH:mm'),
      date: moment(props.data.date, 'YYYY-MM-DD'),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hiddenErrorMessage = <div className="hidden errorMessage" />;
    this.visibleErrorMessages = ['date', 'start time', 'end time'].map((data) => {
      return <div key={data} className="errorMessage"> The {data} of the event is required. </div>;
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.date && this.state.start_time && this.state.end_time) {
      this.props.handleData(this.state);
    }
  }
  render() {
    const dateErrorMessage = (this.state.date === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const startErrorMessage = (this.state.start_time === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    const endErrorMessage = (this.state.end_time === '') ? this.visibleErrorMessages[2] : this.hiddenErrorMessage;
    return (
      <form className="addEventForm" onSubmit={this.handleSubmit}>
        <h2>Date:* </h2>
        {dateErrorMessage}
        <DateTime
          timeFormat={false}
          value={this.state.date || new Date()}
          onChange={(moment) => this.setState({ date: moment })}
          closeOnSelect
          isValidDate={(current) => {
            // this function ensures that events cannot be created for dates before today
            const yesterday = DateTime.moment().subtract(1, 'day');
            return current.isAfter(yesterday);
          }}
        />
        <h2>Start Time:* </h2>
        {startErrorMessage}
        <DateTime
          dateFormat={false}
          value={this.state.start_time || moment()}
          onChange={(moment) => this.setState({ start_time: moment })}
        />
        <h2>End Time:*</h2>
        {endErrorMessage}
        <DateTime
          dateFormat={false}
          value={this.state.end_time || new Date()}
          onChange={(moment) => this.setState({ end_time: moment })}
        />

        <input
          type="submit"
          value="Next"
          className={(!this.state.date || !this.state.start_time || !this.state.end_time) ? 'invalidNextBtn' : 'validNextBtn'}
        />
      </form>
    );
  }
}

export default AddEventPage2;
