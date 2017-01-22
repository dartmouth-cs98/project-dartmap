// nav_bar.js
import React from 'react';

const NavBar = (props) => {
  return (
    <div id="nav-bar">
      <img id="logo" src="./../../images/dartmap.png" role="presentation" />
      <h1 className="app-name">dartmap</h1>
      <button type="button" onClick={props.toggleAddEvent}>
        Add Event
        <img id="plus" src="./../../icon_set_1/plus.png" role="presentation" />
      </button>
    </div>
  );
};

export default NavBar;
