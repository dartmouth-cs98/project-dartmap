// map_balloon_event.js

import React from 'react';
import { Link } from 'react-router';

const MapBalloonEvent = (props) => {
  const event = props.event;
  const categoryString = event.categories.map((cat) => {
    return cat.name;
  }).join(', ');
  if (props.num === 1) { // if there is only one event in the balloon
    return (
      <div className="balloon-evt">
        <b>{event.name} @ {event.start_time.format('h:mm A')}</b>
        <div>{event.description}</div>
        <div>Organizer: {event.organizer}</div>
        <div>Categories: {categoryString}</div>
        <Link to={'/events/'.concat(event.id)}>View More</Link>
      </div>
    );
  }
  return (
    <div className="balloon-evt">
      <img src={event.icon_url} alt="icon" className="popup-icon" />
      <div>{event.name} @ {event.start_time.format('h:mm A')}</div>
      <div>{event.description}</div>
      <div>Organizer: {event.organizer}</div>
      <Link to={'/events/'.concat(event.id)}>View More</Link>
    </div>
  );
};

export default MapBalloonEvent;
