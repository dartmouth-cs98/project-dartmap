// add_event_page_3.js
import React, { Component } from 'react';
import ReactUIDropdown from 'react-ui-dropdown';
import MapContainer from '../map_container';


class AddEventPage3 extends Component {
  static nullFunction() {}
  constructor(props) {
    super(props);
    this.state = {
      location: props.data.location,
      location_string: props.data.location_string,
      center: [43.703337, -72.288578],
      value: 'Academic',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = ['location', 'room'].map((data) => {
      return <div key={data} className="error-msg"> The {data} of the event is required. </div>;
    });
  }

  handleBack(event) {
    const data = {
      location: this.state.location,
      location_string: this.state.location_string,
      currentPage: this.props.currentPage + 1,
    };
    this.props.handleData(data);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.location && this.state.location_string) {
      const data = {
        location: this.state.location,
        location_string: this.state.location_string,
        currentPage: this.props.currentPage + 1,
      };
      this.props.handleData(data);
    }
  }
  render() {
    // const locationErrorMessage = (this.state.location === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const roomErrorMessage = (this.state.location_string === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    const mapHeight = '300px';
    const mapWidth = '300px';
    const icons = [
      {
        id: 1,
        title: 'Academic',
        image: './../../../icon_set_1/academic.png',
      },
      {
        id: 2,
        title: 'Art',
        image: './../../../icon_set_1/art.png',
      },
      {
        id: 3,
        title: 'Sports',
        image: './../../../icon_set_1/game.png',
      },
      {
        id: 4,
        title: 'Performance',
        image: './../../../icon_set_1/music.png',
      },
      {
        id: 5,
        title: 'Lecture',
        image: './../../../icon_set_1/talk.png',
      },
      {
        id: 6,
        title: 'Greek Life',
        image: './../../../icon_set_2/party.png',
      },
      {
        id: 7,
        title: 'Free food',
        image: './../../../icon_set_2/food.png',
      },
    ];
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <br /><br />
        <MapContainer events={[]}
          showBalloonEventId={this.nullFunction}
          showStickyBalloonEventId={this.nullFunction}
          height={mapHeight}
          width={mapWidth}
          selectLocation={(location) => { this.setState({ location }); }}
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
        <h2>Select event category:*</h2>
        <ReactUIDropdown
          label="Select all the relevant categories"
          placeholder="e.g. Academic"
          initialItems={icons}
          onChange={event => this.setState({ value: event.target.value })}
        />
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
            className={(!this.state.location || !this.state.location_string) ? 'invalid-nxt-btn add-event-btn nxt-btn' : 'nxt-btn add-event-btn'}
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage3;
