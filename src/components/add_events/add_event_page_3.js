// add_event_page_3.js
import React, { Component } from 'react';
import MapContainer from '../map_container';

class AddEventPage3 extends Component {
  static nullFunction() {}
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      location_string: null,
      center: [43.703337, -72.288578],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = ['location', 'room'].map((data) => {
      return <div key={data} className="errorMessage"> The {data} of the event is required. </div>;
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.location && this.state.location_string) {
      this.props.handleData(this.state);
    }
  }
  selectLocation(location) {
    this.setState({ location });
  }
  render() {
    // const locationErrorMessage = (this.state.location === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const roomErrorMessage = (this.state.location_string === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    const mapHeight = '300px';
    const mapWidth = '300px';
    return (
      <form className="addEventForm" onSubmit={this.handleSubmit}>
        <br /><br />
        <MapContainer events={[]}
          showBalloonEventId={this.nullFunction}
          showStickyBalloonEventId={this.nullFunction}
          height={mapHeight}
          width={mapWidth}
          selectLocation={this.selectLocation}
          center= {this.state.center}
        />
        <h2>Location Name to Display:*</h2>
        <input
          type="text"
          placeholder="e.g. Collis 112"
          value={this.state.location_string || ''}
          onChange={event => this.setState({ location_string: event.target.value })}
          className={(this.state.location_string !== '') ? 'addEventBox' : 'formBoxError'}
        />
        {roomErrorMessage}
        <input
          type="submit"
          value="Next"
          className={(!this.state.location || !this.state.location_string) ? 'invalidNextBtn' : 'validNextBtn'}
        />
      </form>
    );
  }
}

export default AddEventPage3;
