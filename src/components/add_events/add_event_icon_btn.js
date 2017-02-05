// add_event_icon_btn.js

import React from 'react';

const AddEventIconBtn = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    props.handleSelect(props.icon);
  };
  const className = (props.selected && props.selected.id === props.icon.id) ? 'selected-icon icon-btn' : 'icon-btn';
  return (
    <button className={className} type="button" onClick={handleClick}>
      <img className="icon-btn-img" src={props.icon.url} alt={props.icon.name} />
    </button>
  );
};

export default AddEventIconBtn;
