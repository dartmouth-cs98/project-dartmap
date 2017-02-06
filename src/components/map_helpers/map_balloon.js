// map_balloon.js

import React, { Component } from 'react';
import MapBalloonEvent from './map_balloon_event';

class MapBalloon extends Component {
  constructor(props) {
    super(props);
    this.events = [];
    this.popUp = [];
  }
  render() {
    this.events = this.props.eventsForLocation;
    this.popUp = [];
    for (let i = 0; i < this.events.length; i += 1) {
      const event = this.events[i];
      if (i > 0) {
        const key = 'hbar'.concat(event.id);
        this.popUp.push(<div key={key} className="hbar"><hr /></div>);
      }
      const key = 'balloon'.concat(event.id);
      this.popUp.push(<MapBalloonEvent event={event} key={key} />);
    }
    if (this.props.showBalloon) {
      const popupClassName = 'popup popup'.concat(this.props.id);
      return (
        <div className={popupClassName}>
          <div className="close-button" onClick={this.props.removePopUps}>
            x
          </div>
          {this.popUp}
        </div>
      );
    }
    return (
      <div className="hidden" />
    );
  }
}

export default MapBalloon;
