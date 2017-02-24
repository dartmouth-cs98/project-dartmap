// event_list_item.js
import React from 'react';
import { connect } from 'react-redux';
import './comment.scss';

// import redux actions
import { setStickyBalloonId, setBalloonId, setMapCenter } from '../actions';

const EventListItem = (props) => {
  const startTimeString = props.event.start_time.format('h:mm A');
  const endTimeString = props.event.end_time.format('h:mm A');
  if (!props.selectedLocation || props.selectedLocation === props.event.location) {
    return (
      <div className="event-item"
        onMouseOver={() => props.setBalloonId(props.event.id)}
        onMouseOut={() => props.setBalloonId(null)}
        onClick={() => {
          props.setStickyBalloonId(props.event.id);
          props.setMapCenter({ lat: props.event.lat, lng: props.event.lng });
        }}
      >
        <div className="row">
          <div className="col-md-2">
            <h6 className="name">
              {props.event.name}
            </h6>
            <text className="attribute">
              {startTimeString} ~ {endTimeString} <br />
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
      onMouseOver={() => props.setBalloonId(props.event.id)}
      onMouseOut={() => props.setBalloonId(null)}
      onClick={() => {
        props.setMapCenter({ lat: props.event.lat, lng: props.event.lng });
        props.setStickyBalloonId(props.event.id);
      }}
    />
  );
};

const mapDispatchToProps = { setStickyBalloonId, setBalloonId, setMapCenter };

export default connect(null, mapDispatchToProps)(EventListItem);
