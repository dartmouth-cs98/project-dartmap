// add_event_2.js
import React, { Component } from 'react';

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
    console.log(this.state);
    if (this.state.date === null && this.state.start_time === null && this.state.end_time === null) {
      this.render();
    } else {
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
        <input
          type="text"
          placeholder="mm/dd/yy"
          value={this.state.date || ''}
          onChange={event => this.setState({ date: event.target.value })}
          className={(this.state.date === '') ? 'formBoxError' : 'addEventBox'}
        />
        <h2>Start Time:* </h2>
        {startErrorMessage}
        <input
          type="text"
          placeholder="hh:mm"
          value={this.state.start_time || ''}
          onChange={event => this.setState({ start_time: event.target.value })}
          className={(this.state.start_time === '') ? 'formBoxError' : 'addEventBox'}
        />
        <h2>End Time:*</h2>
        {endErrorMessage}
        <input
          type="text"
          placeholder="hh:mm"
          value={this.state.end_time || ''}
          onChange={event => this.setState({ end_time: event.target.value })}
          className={(this.state.end_time === '') ? 'formBoxError' : 'addEventBox'}
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
