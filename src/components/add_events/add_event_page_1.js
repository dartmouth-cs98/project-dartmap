// add_event_page_1.js
import React, { Component } from 'react';

class AddEventPage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name,
      description: props.data.description,
      organizer: props.data.organizer,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = ['name', 'organizer', 'description'].map((data) => {
      return <div key={data} className="errorMessage"> The {data} of the event is required. </div>;
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.description && this.state.organizer && this.state.name) {
      this.props.handleData(this.state);
    }
  }
  render() {
    const nameErrorMessage = (this.state.name === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const organizerErrorMessage = (this.state.organizer === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    const desciptionErrorMessage = (this.state.description === '') ? this.visibleErrorMessages[2] : this.hiddenErrorMessage;
    return (
      <form className="addEventForm" onSubmit={this.handleSubmit}>
        <h2>Name of Event:* </h2>
        <input
          type="text"
          placeholder="e.g. Homecoming Bonfire"
          value={this.state.name || ''}
          onChange={event => this.setState({ name: event.target.value })}
          className={(this.state.name !== '') ? 'addEventBox' : 'formBoxError'}
        />
        {nameErrorMessage}
        <h2>Event Organizer:*</h2>
        <input
          type="text"
          placeholder="e.g. Collis Governing Board"
          value={this.state.organizer || ''}
          onChange={event => this.setState({ organizer: event.target.value })}
          className={(this.state.organizer !== '') ? 'addEventBox' : 'formBoxError'}
        />
        {organizerErrorMessage}
        <h2>Description:*</h2>
        <textarea
          placeholder="e.g. See freshmen running in circles"
          value={this.state.description || ''}
          onChange={event => this.setState({ description: event.target.value })}
          className={(this.state.description === '') ? 'formBoxError' : 'addEventBox'}
        />
        {desciptionErrorMessage}
        <input
          type="submit"
          value="Next"
          className={(!this.state.description || !this.state.organizer || !this.state.name) ? 'invalidNextBtn' : 'validNextBtn'}
        />
      </form>
    );
  }
}

export default AddEventPage1;
