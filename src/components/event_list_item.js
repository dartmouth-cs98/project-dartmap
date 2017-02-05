// event_list_item.js
import React from 'react';
import {
  FBComments,
} from 'facebook-plugins';

const EventListItem = (props) => {
  console.log(props.selectedLocation);
  if (!props.selectedLocation || props.selectedLocation === props.event.location) {
    return (
      <div>
        <div className="event-item"
          onMouseOver={() => props.showBalloon(props.event.id)}
          onMouseOut={() => props.showBalloon(null)}
          onClick={() => props.onEventListItemClick(props.event.id, [props.event.lat, props.event.lng])}
        >
          <h6 className="name">
            {props.event.name}
          </h6>
          <text className="attribute">
            {props.event.start_time.format('h:mm A')} ~ {props.event.end_time.format('h:mm A')}<br />
            {props.event.location_name}
          </text>
          <div id="fb-root" />
          <div className="fb-comments"
            data-href="http://localhost:8080/"
            data-numposts="10"
          />
        </div>
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
