// add_event_page_3.js
import React, { Component } from 'react';
import MapContainer from '../map_container';


class AddEventPage3 extends Component {
  static nullFunction() {}
  constructor(props) {
    super(props);
    this.state = {
      location_obj: props.data.location_obj,
      location_string: props.data.location_string,
      center: [43.703337, -72.288578],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSelectedLocation = this.handleSelectedLocation.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = ['location', 'room'].map((data) => {
      return <div key={data} className="error-msg"> The {data} of the event is required. </div>;
    });
  }

  handleBack(event) {
    const data = {
      location_obj: this.state.location_obj,
      location_string: this.state.location_string,
      currentPage: this.props.currentPage - 1,
    };
    this.props.handleData(data);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.location_obj && this.state.location_string) {
      const data = {
        location_obj: this.state.location_obj,
        location_string: this.state.location_string,
        currentPage: this.props.currentPage + 1,
      };
      this.props.handleData(data);
    }
  }

  handleSelectedLocation(data) {
    this.setState(data);
  }

  render() {
    // const locationErrorMessage = (this.state.location === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const roomErrorMessage = (this.state.location_string === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    const mapHeight = '300px';
    const mapWidth = '300px';
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          <MapContainer events={this.state.location_obj || []}
            showBalloonEventId={this.nullFunction}
            showStickyBalloonEventId={this.nullFunction}
            height={mapHeight}
            width={mapWidth}
            handleSelectedLocation={this.handleSelectedLocation}
            center={this.state.center}
          />
          <h2>Location Name to Display:*</h2>
          <input
            type="text"
            placeholder="e.g. Collis 112"
            value={this.state.location_string || ''}
            onChange={event => this.setState({ location_string: event.target.value })}
            className={(this.state.location_string !== '') ? 'add-event-text add-event-loc-string' : 'add-event-text add-event-loc-string error-box'}
          />
          {roomErrorMessage}
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
            className={(!this.state.location_obj || !this.state.location_string) ? 'invalid-nxt-btn add-event-btn nxt-btn' : 'nxt-btn add-event-btn'}
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage3;
