// nav_bar.js
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fbPicUrl: null,
      showMenu: false,
    };
    this.facebookLogin = this.facebookLogin.bind(this);
    this.facebookLogout = this.facebookLogout.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.fb_profile_image_url) {
      this.setState({ fbPicUrl: newProps.fb_profile_image_url });
    }
  }

  facebookLogin() {
    this.props.handleLoginClick();
    var loginButton = document.getElementById("login-button");
    loginButton.innerHTML = "Logging in...";
  }

  openMenu() {
    this.setState({ showMenu: true });
    document.addEventListener("click", this.closeMenu);
  }

  closeMenu() {
    this.setState({ showMenu: false });
    document.removeEventListener("click", this.closeMenu);
  }

  facebookLogout() {
    this.props.facebookLogout();
    this.setState({ showMenu: false });
  }

  render() {
    let greeting = <h2 className="navbar-greeting">Welcome! Please log in...</h2>;
    if (this.props.userInfo != null) {
      greeting = <h2 className="navbar-greeting">Hi, {this.props.userInfo.name}!</h2>;
    }
    let fbPic = <div id="user-link" className="nav-btn" onClick={this.openMenu}></div>;

    /* Delay so that "Profile" does not always how on screen */
    setTimeout(() => {
      const user_link = document.getElementById('user-link');
      if (user_link && !this.state.fbPicUrl) {
        user_link.innerHTML = "Profile";
      }
    }, 10000);
    if (this.state.fbPicUrl) {
      fbPic = <div id="user-link" className="nav-btn" onClick={this.openMenu}><img src={this.state.fbPicUrl} id="fb-pic" /></div> 
    }

    if (this.props.logged_in) {
      if (this.state.showMenu) {
        const user_link = document.getElementById('user-link');
        const rect = user_link.getBoundingClientRect();
        const menuStyle = {
          position: 'absolute',
          left: (rect.left - 122).toString().concat('px'),
          top: (rect.bottom - 10).toString().concat('px'),
        };
        return (
          <div id="nav-bar">
            <Link to="/" className="logo-link nav-btn">
              <img id="logo" src="./../../images/dartmap.png" role="presentation" />
              <h1 className="app-name">mappit</h1>
            </Link>
            {greeting}
            {fbPic}
            <div className='user-menu' style={menuStyle}>
              <div className='user-menu-item-container' onClick={this.facebookLogout}>
                <div className='user-menu-item-text'>Log Out</div>
              </div>
              <Link to="/user" id="user-link" className="nav-btn user-menu-item-container">
                <div className='user-menu-item-text'>User Profile Page</div>
              </Link>
            </div>
          </div>
        );
      } else {
        return (
          <div id="nav-bar">
            <Link to="/" className="logo-link nav-btn">
              <img id="logo" src="./../../images/dartmap.png" role="presentation" />
              <h1 className="app-name">mappit</h1>
            </Link>
            {greeting}
            {fbPic}
          </div>
        );
      }
    } else {
      return (
        <div id="nav-bar">
          <Link to="/" className="logo-link nav-btn">
            <img id="logo" src="./../../images/dartmap.png" role="presentation" />
            <h1 className="app-name">mappit</h1>
          </Link>
          <button className="fb-user" id="login-button" onClick={this.facebookLogin}>Facebook Log In</button>
        </div>
      );
    }
  }
}
