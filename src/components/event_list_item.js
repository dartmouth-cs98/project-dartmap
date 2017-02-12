// event_list_item.js
import React from 'react';

const EventListItem = (props) => {
  if (!props.selectedLocation || props.selectedLocation === props.event.location) {
    return (
      <div className="event-item"
        onMouseOver={() => props.showBalloon(props.event.id)}
        onMouseOut={() => props.showBalloon(null)}
        onClick={() => props.onEventListItemClick(props.event.id, { lat: props.event.lat, lng: props.event.lng })}
      >
        <h6 className="name">
          {props.event.name}
        </h6>
        <text className="attribute">
          {props.event.start_time.format('h:mm A')} ~ {props.event.end_time.format('h:mm A')}<br />
          {props.event.location_name}
        </text>
      </div>
    );
  }
  return (
    <div className="location-not-selected"
      onMouseOver={() => props.showBalloon(props.event.id)}
      onMouseOut={() => props.showBalloon(null)}
      onClick={() => props.onEventListItemClick(props.event.id, { lat: props.event.lat, lng: props.event.lng })}
    />
  );
};

export default EventListItem;
