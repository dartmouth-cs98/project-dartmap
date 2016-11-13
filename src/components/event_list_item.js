// event_list_item.js
import React from 'react';

const EventListItem = (props) => {
  if (!props.selectedLocation || props.selectedLocation === props.event.location) {
    return (
      <div className="event-item"
        onMouseOver={() => props.showBalloon(props.event.id)}
        onMouseOut={() => props.showBalloon(null)}
        onClick={() => props.onEventListItemClick(props.event.id, [props.event.lat, props.event.lng])}
      >
        <h5 className="name">
          {props.event.name} @ {props.event.start_time.format('h:mm A')}
        </h5>
        <div className="description">{props.event.description}</div>
        Organizer: {props.event.organizer}
      </div>
    );
  }
  return (
    <div className="location-not-selected"
      onMouseOver={() => props.showBalloon(props.event.id)}
      onMouseOut={() => props.showBalloon(null)}
      onClick={() => props.onEventListItemClick(props.event.id, [props.event.lat, props.event.lng])}
    />
  );
};

export default EventListItem;
