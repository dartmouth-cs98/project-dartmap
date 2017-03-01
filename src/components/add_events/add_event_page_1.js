// add_event_page_1.js
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
          <TextField
            className='add-event-field-container-1'
            hintText="e.g. Homecoming Bonfire"
            floatingLabelText="Event name"
            value={this.state.name || ''}
            fullWidth={true}
            onChange={event => this.setState({ name: event.target.value })}
          />
          {nameErrorMessage}
          <br />
          <TextField
            className='add-event-field-container-1'
            hintText="e.g. Collis Governing Board"
            floatingLabelText="Event Organizer"
            value={this.state.organizer || ''}
            fullWidth={true}
            onChange={event => this.setState({ organizer: event.target.value })}
          />
          {organizerErrorMessage}
          <br />
          <TextField
            className='add-event-field-container-1'
            hintText="e.g. The Green"
            floatingLabelText="Event room or location"
            value={this.state.location_string || ''}
            fullWidth={true}
            onChange={event => this.setState({ location_string: event.target.value })}
          />
          {roomErrorMessage}
          <br />
          <TextField
            className='add-event-field-container-1'
            hintText="e.g. See freshman running in circles around a fire"
            floatingLabelText="Event description"
            multiLine={true}
            rows={2}
            rowsMax={2}
            value={this.state.description || ''}
            fullWidth={true}
            onChange={event => this.setState({ description: event.target.value })}
          />
          {desciptionErrorMessage}
        </div>
        <div className="add-event-btns">
          <RaisedButton 
            label="Next"
            primary={true}
            type="submit"
            disabled={(!this.state.description || !this.state.organizer || !this.state.name || !this.state.location_string)}
            className="nxt-btn"
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage1;
