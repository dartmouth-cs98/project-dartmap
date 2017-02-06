// map_balloon_event.js

import React from 'react';
import { Link } from 'react-router';

const MapBalloonEvent = (props) => {
  const event = props.event;
  return (
    <div className="balloon-evt">
      <b>{event.name} @ {event.start_time.format('h:mm A')}</b>
      <div>{event.description}</div>
      <div>Organizer: {event.organizer}</div>
      <Link to={'/events/'.concat(event.id)}>View More</Link>
    </div>
  );
};

export default MapBalloonEvent;
