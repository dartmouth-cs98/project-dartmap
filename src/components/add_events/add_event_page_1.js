// add_event_page_1.js
import React, { Component } from 'react';

class AddEventPage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name,
      description: props.data.description,
      organizer: props.data.organizer,
      location_string: props.data.location_string,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = ['name', 'organizer', 'room', 'description'].map((data) => {
      return <div key={data} className="error-msg"> The {data} of the event is required. </div>;
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.description && this.state.organizer && this.state.name && this.state.location_string) {
      const data = {
        name: this.state.name,
        description: this.state.description,
        organizer: this.state.organizer,
        location_string: this.state.location_string,
        currentPage: this.props.currentPage + 1,
      };
      this.props.handleData(data);
    }
  }
  render() {
    const nameErrorMessage = (this.state.name === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const organizerErrorMessage = (this.state.organizer === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    const roomErrorMessage = (this.state.location_string === '') ? this.visibleErrorMessages[2] : this.hiddenErrorMessage;
    const desciptionErrorMessage = (this.state.description === '') ? this.visibleErrorMessages[3] : this.hiddenErrorMessage;
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          <div className='add-event-field-container-1'>
            <h2>Event name</h2>
            <input
              type="text"
              value={this.state.name || ''}
              onChange={event => this.setState({ name: event.target.value })}
              className={(this.state.name !== '') ? 'add-event-text' : 'add-event-text error-box'}
            />
          </div>
          {nameErrorMessage}
          <br />
          <div className='add-event-field-container-1'>
            <h2>Event organizer</h2>
            <input
              type="text"
              value={this.state.organizer || ''}
              onChange={event => this.setState({ organizer: event.target.value })}
              className={(this.state.organizer !== '') ? 'add-event-text' : 'add-event-text error-box'}
            />
          </div>
          {organizerErrorMessage}
          <br />
          <div className='add-event-field-container-1'>
            <h2>Event room or location</h2>
            <input
              type="text"
              value={this.state.location_string || ''}
              onChange={event => this.setState({ location_string: event.target.value })}
              className={(this.state.location_string !== '') ? 'add-event-text add-event-loc-string' : 'add-event-text add-event-loc-string error-box'}
            />
          </div>
          {roomErrorMessage}
          <br />
          <div className='add-event-field-container-1'>
            <h2>Event description</h2>
            <textarea
              value={this.state.description || ''}
              onChange={event => this.setState({ description: event.target.value })}
              className={(this.state.description === '') ? 'add-event-text error-box' : 'add-event-text'}
            />
          </div>
          {desciptionErrorMessage}
        </div>
        <div className="add-event-btns">
          <input
            type="submit"
            value="Next"
            className={(!this.state.description || !this.state.organizer || !this.state.name || !this.state.location_string) ? 'invalid-nxt-btn nxt-btn add-event-btn' : 'nxt-btn add-event-btn'}
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage1;
