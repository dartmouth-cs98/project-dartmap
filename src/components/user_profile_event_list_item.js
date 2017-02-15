// event_list_item.js
import React from 'react';

const UserEventListItem = (props) => {
  console.log('props.event');
  console.log(props.event);
  return (
    <div className="event-item"
      onClick={() => props.onEventListItemClick(props.event.id)}
    >
      <h6 className="name">
        {props.event.name}
      </h6>
      <text className="attribute">
        {props.event.start_time.format('h:mm A')} ~ {props.event.end_time.format('h:mm A')}<br />
        Location: {props.event.location_name}<br />
        Organizer: {props.event.organizer}<br />
        Description: {props.event.description}<br />
      </text>
      <button className="user-delete-event" type="button">
        Delete Event
      </button>
    </div>
  );
};

export default UserEventListItem;

        // Categories: {props.event.categories}<br />
