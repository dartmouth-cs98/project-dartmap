// event_list_item.js
import React from 'react';

const EventListItem = (props) => {
  if (!props.selectedLocation || props.selectedLocation === props.event.location) {
    return (
      <div className="event-item"
        onMouseOver={() => props.showBalloon(props.event.id)}
        onMouseOut={() => props.showBalloon(null)}
        onClick={() => props.showStickyBalloon(props.event.id)}
      >
        <h5 className="name">
          {props.event.name}
        </h5>

        <font size="2">
          <li className="description">Description: {props.event.description}</li>
          <li>Organizer: {props.event.organizer}</li>
          <li>Date: {props.event.date._i} {props.event.start_time.format('hh:mm A')}</li>
        </font>
      </div>
    );
  }
  return (
    <div className="location-not-selected"
      onMouseOver={() => props.showBalloon(props.event.id)}
      onMouseOut={() => props.showBalloon(null)}
      onClick={() => props.showStickyBalloon(props.event.id)}
    />
  );
};

export default EventListItem;
