// nav_bar.js
import React from 'react';
import { Link } from 'react-router';

const NavBar = (props) => {
  return (
    <div id="nav-bar">
      <Link to="/" className="logo-link nav-btn">
        <img id="logo" src="./../../images/dartmap.png" role="presentation" />
        <h1 className="app-name">dartmap</h1>
      </Link>
      <Link to="/user" className="user-link nav-btn">Profile</Link>
    </div>
  );
};

export default NavBar;
