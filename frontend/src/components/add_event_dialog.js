// add_event_dialog.js
import React from 'react';

const AddEventDialog = (props) => {
  if (!props.addEvent) {
    return (
      <div>I am the hidden dialog to add events.</div>
    );
  }
  return (
    <div>I am the dialog to add events.</div>
  );
};

export default AddEventDialog;
