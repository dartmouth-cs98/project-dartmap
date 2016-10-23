// add_event_2.js
import React, { Component } from 'react';
import DateTime from 'react-datetime';

class AddEvent2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_time: null,
      end_time: null,
      date: null,
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
      const data = {
        start_time: this.state.start_time.format('HH:mm'),
        end_time: this.state.end_time.format('HH:mm'),
        date: this.state.date.format('MM/DD/YYYY'),
      };
      this.props.handleData(data);
    }
  }
  render() {
    const dateErrorMessage = (this.state.date === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const startErrorMessage = (this.state.start_time === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    const endErrorMessage = (this.state.end_time === '') ? this.visibleErrorMessages[2] : this.hiddenErrorMessage;
    // const inputProps = {'required': true};
    return (
      <form className="addEventForm" onSubmit={this.handleSubmit}>
        <h2>Date:* </h2>
        {dateErrorMessage}
        <DateTime
          timeFormat={false}
          value={this.state.date || ''}
          onChange={moment => this.setState({ date: moment })}
        />
        <h2>Start Time:* </h2>
        {startErrorMessage}
        <DateTime
          dateFormat={false}
          value={this.state.start_time || ''}
          onChange={moment => this.setState({ start_time: moment })}
        />
        <h2>End Time:*</h2>
        {endErrorMessage}
        <DateTime
          dateFormat={false}
          value={this.state.end_time || ''}
          onChange={moment => this.setState({ end_time: moment })}
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

export default AddEvent2;
