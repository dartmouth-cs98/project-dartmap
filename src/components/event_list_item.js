// event_list_item.js
import React from 'react';
import { connect } from 'react-redux';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';



// import redux actions
import { setStickyBalloonId, setBalloonId, setMapCenter } from '../actions';

const EventListItem = (props) => {
  const startTimeString = props.event.start_time.format('h:mm A');
  const endTimeString = props.event.end_time.format('h:mm A');
  if (!props.selectedLocation || props.selectedLocation === props.event.location) {
    return (
      <div className="event-item"
        onMouseOver={() => props.setBalloonId(props.event.location_id)}
        onMouseOut={() => props.setBalloonId(null)}
        onClick={() => {
          props.setStickyBalloonId(props.event.location_id);
          props.setMapCenter({ lat: props.event.lat, lng: props.event.lng });
        }}
      >
        <ListItem 
          value={props.num}
          primaryText={props.event.name}
          secondaryText={
            <text className="attribute">
              {startTimeString} ~ {endTimeString} <br />
              {props.event.location_name}
            </text>
          }
           leftAvatar={<Avatar src={props.event.icon_url} />}
        />
      </div>
    );
  }
  return (
    <div className="location-not-selected"
      onMouseOver={() => props.setBalloonId(props.event.location_id)}
      onMouseOut={() => props.setBalloonId(null)}
      onClick={() => {
        props.setMapCenter({ lat: props.event.lat, lng: props.event.lng });
        props.setStickyBalloonId(props.event.location_id);
      }}
    />
  );
};

const mapDispatchToProps = { setStickyBalloonId, setBalloonId, setMapCenter };

export default connect(null, mapDispatchToProps)(EventListItem);
