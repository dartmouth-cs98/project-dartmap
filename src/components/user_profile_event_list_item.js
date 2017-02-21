// event_list_item.js
import React from 'react';

import { deleteEvent } from '../helpers/dartmap-api';

const UserEventListItem = (props) => {
  // confirms whether the event should be deleted
  // TODO: make the confirmation dialog prettier
  function confirmDelete() {
    const r = confirm('Are you sure you want to delete this event?');
    if (r === true) {
      deleteEvent('4');
      console.log('EVENT SHOULD BE DELETED');
    } else {
      console.log('EVENT SHOULD NOT BE DELETED');
    }
  }

  // this block of code builds the string to display the event's categories
  let categoriesString = '';
  if (props.event.categories.length === 1) {
    categoriesString += 'Category: ';
  } else {
    categoriesString += 'Categories: ';
  }
  let i;
  for (i = 0; i < props.event.categories.length; i += 1) {
    if (i !== 0) {
      categoriesString += ', ' + props.event.categories[i].name;
    } else {
      categoriesString += props.event.categories[i].name;
    }
  }

  return (
    <div className="event-item"
      onClick={() => props.onEventListItemClick(props.event.id)}
    >
      <h6 className="name">
        {props.event.name}
      </h6>
      <text className="attributeTitle">
        Time:<br />
      </text>
      <text className="attribute">
        {props.event.start_time.format('h:mm A')} ~ {props.event.end_time.format('h:mm A')}<br />
      </text>
      <text className="attributeTitle">
        Location:<br />
      </text>
      <text className="attribute">
        {props.event.location_name}<br />
      </text>
      <text className="attributeTitle">
        Organizer:<br />
      </text>
      <text className="attribute">
        {props.event.organizer}<br />
      </text>
      <text className="attributeTitle">
        Categories:<br />
      </text>
      <text className="attribute">
        {categoriesString}<br />
      </text>
      <text className="attributeTitle">
        Description:<br />
      </text>
      <input
        type="text"
        placeholder="*  Event details"
        value={props.event.description}
      />
      <text className="attributeTitle">
        <br />
      </text>
      <button className="user-delete-event" type="button" onClick={confirmDelete}>
        Delete
      </button>
      <button className="user-edit-event" type="button" onClick={confirmDelete}>
        Edit
      </button>
    </div>
  );
};

export default UserEventListItem;
