// nav_bar.js
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NavBar extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.fb_profile_image_url) {
      const userLink = document.getElementById('user-link');
      userLink.innerHTML = '';
      const img = new Image(); // width, height values are optional params
      img.src = newProps.fb_profile_image_url;
      img.id = 'fb-pic';
      userLink.appendChild(img);
    }
  }

  render() {
    if (this.props.logged_in) {
      return (
        <div id="nav-bar">
          <Link to="/" className="logo-link nav-btn">
            <img id="logo" src="./../../images/dartmap.png" role="presentation" />
            <h1 className="app-name">dartmap</h1>
          </Link>
          <Link to="/user" id="user-link" className="nav-btn">Profile</Link>
        </div>
      );
    } else {
      return (
        <div id="nav-bar">
          <Link to="/" className="logo-link nav-btn">
            <img id="logo" src="./../../images/dartmap.png" role="presentation" />
            <h1 className="app-name">dartmap</h1>
          </Link>
          <button className="fb-user" onClick={this.props.handleLoginClick}>Facebook Log In</button>
        </div>
      );
    }
  }
}
