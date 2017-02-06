// map_balloon_event.js

import React from 'react';
import { Link } from 'react-router';

const MapBalloonEvent = (props) => {
  const event = props.event;
  if (props.num === 1) { // if there is only one event in the balloon
    return (
      <div className="balloon-evt">
        <b>{event.name} @ {event.start_time.format('h:mm A')}</b>
        <div>{event.description}</div>
        <div>Organizer: {event.organizer}</div>
        <div>Categories: {event.categories}</div>
        <Link to={'/events/'.concat(event.id)}>View More</Link>
      </div>
    );
  }
  return (
    <div className="balloon-evt">
      <img src={event.icon_url} alt="icon" className="popup-icon" />
      <b>{event.name} @ {event.start_time.format('h:mm A')}</b>
      <div>{event.description}</div>
      <div>Organizer: {event.organizer}</div>
      <Link to={'/events/'.concat(event.id)}>View More</Link>
    </div>
  );
};

export default MapBalloonEvent;
