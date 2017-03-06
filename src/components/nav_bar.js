// nav_bar.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// import the redux actions
import { login, logout, getLoginStatusFromFb } from '../actions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    this.defaultGreeting = (
      <h2 className="navbar-greeting">Welcome! Please log in...     </h2>
    );
    this.userButton = this.fbLoginButton;
    this.greeting = this.defaultGreeting;
    this.buttonContent = null;
    this.initialFbLoad = false;
    // bind all of the functions
    this.facebookLogin = this.facebookLogin.bind(this);
    this.facebookLogout = this.facebookLogout.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentWillUpdate() {
    if (!this.initialFbLoad && window.FB) {
      this.props.getLoginStatusFromFb();
      this.initialFbLoad = true;
    }
  }

  facebookLogin() {
    this.props.login();
    const loginButton = document.getElementById('login-button');
    loginButton.innerHTML = 'Logging in...     ';
  }

  openMenu() {
    this.setState({ showMenu: true });
    document.addEventListener('click', this.closeMenu);
  }

  closeMenu() {
    this.setState({ showMenu: false });
    document.removeEventListener('click', this.closeMenu);
  }

  facebookLogout() {
    this.props.logout();
    this.setState({ showMenu: false });
  }

  render() {
    if (this.props.user.loggedIn) {
      this.greeting = (
        <h2 className="navbar-greeting">
          {this.props.userInfo.name === '' ? '' : 'Hi, ' + this.props.userInfo.name + '!'}
        </h2>
      );
      if (this.props.fbProfPicUrl) {
        this.buttonContent = (
          <img
            id="fb-pic"
            src={this.props.fbProfPicUrl}
            alt="fb profile pic"
          />
        );
      } else {
        this.buttonContent = 'Profile';
      }
      this.userButton = (
        <button type="button" className="user-nav-btn nav-btn" onClick={this.openMenu}>
          {this.buttonContent}
        </button>
      );
    } else {
      this.greeting = this.defaultGreeting;
      this.userButton = (
        <button id="login-button" className="fb-user nav-btn" onClick={this.facebookLogin}>
          Facebook Log In
        </button>
      );
    }

    const menuClass = (this.state.showMenu) ? 'user-menu' : 'hidden';

    return (
      <div id="nav-bar">
        <Link to="/" className="logo-link nav-btn">
          <img id="logo" src="/images/dartmap.png" role="presentation" />
          <h1 className="app-name">mappit</h1>
        </Link>
        <div className="nav-menu-right">
          {this.greeting}
          <div className="nav-menu-container">
            {this.userButton}
            <div className={menuClass}>
              <div className="user-menu-item-container" onClick={this.facebookLogout}>
                <div className="user-menu-item-text">Log Out</div>
              </div>
              <Link to="/user" id="user-link" className="nav-btn user-menu-item-container">
                <div className="user-menu-item-text">User Profile Page</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.user,
    fbProfPicUrl: state.user.fbProfPicUrl,
    userInfo: state.user.userInfo && state.user.userInfo[0],
  }
);

const mapDispatchToProps = { login, logout, getLoginStatusFromFb };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
