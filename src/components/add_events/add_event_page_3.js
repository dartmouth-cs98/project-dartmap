// add_event_page_3.js
import React, { Component, PropTypes } from 'react';
import MapContainer from '../map_container';
import Dropdown from 'react-drop-down'
import ReactDOM from 'react-dom'
import ReactUIDropdown from 'react-ui-dropdown';

class AddEventPage3 extends Component {
  static nullFunction() {}
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      location_string: null,
      center: [43.703337, -72.288578],
      value: 'Academic'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = ['location', 'room'].map((data) => {
      return <div key={data} className="errorMessage"> The {data} of the event is required. </div>;
    });
  }

  handleChange (e) {
    this.setState({value: e})
    console.log(e)
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
    const icons = [
    {
      id: 1,
      title: "Academic",
      image: "./../../../icon_set_1/academic.png"
    },
    {
      id: 2,
      title: "Art",
      image: "./../../../icon_set_1/art.png"
    },
    {
      id: 3,
      title: "Game",
      image: "./../../../icon_set_1/game.png"
    },
    {
      id: 4,
      title: "Performance",
      image: "./../../../icon_set_1/music.png"
    },
    {
      id: 5,
      title: "Lecture",
      image: "./../../../icon_set_1/talk.png"
    },
    {
      id: 6,
      title: "Greek Life",
      image: "./../../../icon_set_2/party.png"
    },
    {
      id: 7,
      title: "Free food",
      image: "./../../../icon_set_2/food.png"
    },
    ];
    return (
      <form className="addEventForm" onSubmit={this.handleSubmit}>
        <br /><br />
        <MapContainer events={[]}
          showBalloonEventId={this.nullFunction}
          showStickyBalloonEventId={this.nullFunction}
          height={mapHeight}
          width={mapWidth}
          selectLocation={this.selectLocation}
          center={this.state.center}
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
        <h2>Select event category:*</h2>
        <ReactUIDropdown
          label="Select all the relevant categories"
          placeholder="e.g. Academic"
          initialItems={icons}
          onChange={this.handleChange.bind(this)}
        />
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
