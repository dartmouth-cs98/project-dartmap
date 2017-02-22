// map_events.js

import React from 'react';
import { connect } from 'react-redux';

import MapBalloon from './map_balloon';

// import redux actions
import { setStickyBalloonId } from '../../actions';

/**
 * This Class includes all the functions that draw the popup balloons in the window.
 */
const EventsWithControllableHover = (props) => {
  const imageSrc = (props.eventsForLocation.length > 1) ? 'https://s27.postimg.org/ws3spwi9f/unknown.png' : props.eventsForLocation[0].icon_url;
  const currentClass = props.showBalloonId ? 'event-hover' : 'event';
  return (
    <div>
      <button
        type="button"
        onClick={() => props.setStickyBalloonId(props.id)}
        id={props.id}
        className={currentClass}
      >
        <img className="map-event-img" src={imageSrc} alt="icon" />
        <div>{props.text}</div>
      </button>
      <MapBalloon
        hoverKey={props.hoverKey}
        id={props.id}
        eventsForLocation={props.eventsForLocation}
      />
    </div>
  );
};

const mapDToProps = { setStickyBalloonId };

export default connect(null, mapDToProps)(EventsWithControllableHover);
