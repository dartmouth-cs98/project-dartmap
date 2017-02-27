// event_list_item.js
import React from 'react';
import { connect } from 'react-redux';

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
          <div className="col-md-11">
            <div className="row">
              <h6 className="col-md-9 name">
                {props.event.name}
              </h6>
            </div>
            <text className="attribute">
              {startTimeString} ~ {endTimeString} <br />
              {props.event.location_name}
            </text>
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
