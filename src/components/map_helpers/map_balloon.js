// map_balloon.js

import React, { Component } from 'react';
import { connect } from 'react-redux';

// import React components
import MapBalloonEvent from './map_balloon_event';

// import redux actions
import { clearBalloons } from '../../actions';

class MapBalloon extends Component {
  constructor(props) {
    super(props);
    this.events = [];
    this.popUp = [];
  }
  render() {
    let key;
    this.events = this.props.eventsForLocation;
    if (this.events.length < 1) {
      return (
        <div className="hidden" />
      );
    }
    const locationId = this.events[0].location_id;
    if ((this.props.stickyBalloonId !== locationId)
      && (this.props.hoverKey !== locationId)
      && (this.props.balloonId !== locationId)) {
      return (
        <div className="hidden" />
      );
    }
    this.popUp = [];
    for (let i = 0; i < this.events.length; i += 1) {
      const event = this.events[i];
      if (i === 0) {
        this.popUp.push(
          <div className='popup-location' key="location">{event.location_name}</div>
        );
      }
      key = 'hbar'.concat(event.id);
      this.popUp.push(<div key={key} className="hbar"><hr /></div>);
      key = 'balloon'.concat(event.id);
      this.popUp.push(
        <MapBalloonEvent event={event} num={this.events.length} key={key} />
      );
    }
    const popupClassName = 'popup popup'.concat(this.props.id);
    return (
      <div className={popupClassName}>
        <div className="close-button" onClick={this.props.clearBalloons}>
          x
        </div>
        {this.popUp}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    stickyBalloonId: state.map.stickyBalloonId,
    balloonId: state.map.balloonId,
  }
);

export default connect(mapStateToProps, { clearBalloons })(MapBalloon);
