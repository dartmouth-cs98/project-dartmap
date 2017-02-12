// map_events.js

import React from 'react';

import MapBalloon from './map_balloon';

/**
 * This Class includes all the functions that draw the popup balloons in the window.
 */
const EventsWithControllableHover = (props) => {
  const imageSrc = (props.eventsForLocation.length > 1) ? 'https://s27.postimg.org/ws3spwi9f/unknown.png' : props.eventsForLocation[0].icon_url;
  const currentClass = props.showBalloonId ? 'event-hover' : 'event';
  return (
    <div>
      <button type="button" onClick={() => props.showStickyBalloon(props.id)} id={props.id} className={currentClass}>
        <img className="map-event-img" src={imageSrc} alt="icon" />
        <div>{props.text}</div>
      </button>
      <MapBalloon
        showBalloon={(props.showStickyBalloonId === props.id) || (props.showBalloonId)}
        id={props.id}
        eventsForLocation={props.eventsForLocation}
        removePopUps={props.removePopUps}
      />
    </div>
  );
};

export default EventsWithControllableHover;
