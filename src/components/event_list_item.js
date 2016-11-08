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

        <font size="2" className="attributes">
          <li>{props.event.description}</li>
          <li>{props.event.organizer}</li>
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
