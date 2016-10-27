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
        {props.event.name}
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
