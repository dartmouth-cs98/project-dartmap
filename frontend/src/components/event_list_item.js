// event_list_item.js
import React from 'react';

const EventListItem = (props) => {
  if (!props.selectedLocation || props.selectedLocation === props.event.location){
    return (
      <div className="event-item">{props.event.name}</div>
    );
  }
  return(
    <div className="location-not-selected"></div>
  );
};

export default EventListItem;
