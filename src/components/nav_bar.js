// nav_bar.js
import React from 'react';

const NavBar = (props) => {
  return (
    <div id="nav-bar">
      <img src="./../../project-dartmap/images/dartmap.png" role="presentation" height="60" width="60" />
      <h1 className="app-name">dartmap</h1>
      <button type="button" onClick={props.toggleAddEvent}>Add Event</button>
    </div>
  );
};

export default NavBar;
