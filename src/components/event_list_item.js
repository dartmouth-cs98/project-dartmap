// event_list_item.js
import React from 'react';
import './comment.scss';

const EventListItem = (props) => {
  console.log(props.selectedLocation);
  if (!props.selectedLocation || props.selectedLocation === props.event.location) {
    return (
      <div className="event-item"
        onMouseOver={() => props.showBalloon(props.event.id)}
        onMouseOut={() => props.showBalloon(null)}
        onClick={() => props.onEventListItemClick(props.event.id, { lat: props.event.lat, lng: props.event.lng })}
      >
        <div className="row">
          <div className="col-md-2">
            <h6 className="name">
              {props.event.name}
            </h6>
            <text className="attribute">
              {props.event.start_time.format('h:mm A')} ~ {props.event.end_time.format('h:mm A')}<br />
              {props.event.location_name}
            </text>
          </div>
          <div className="col-md-1">
            <div className="col-md-3 pull-right">
              <button type="button">RSVP</button>
            </div>
          </div>
        </div>
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
