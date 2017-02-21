// nav_bar.js
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// import the redux actions
import { login } from '../actions';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.notLoggedInGreeting = (
      <h2 className="navbar-greeting">Welcome! Please log in...</h2>
    );
    this.fbLoginButton = (
      <button className="fb-user" onClick={this.props.login}>
        Facebook Log In
      </button>
    );
    this.userButton = this.fbLoginButton;
    this.greeting = this.notLoggedInGreeting;
  }

  render() {
    if (this.props.loggedIn) {
      this.greeting = (
        <h2 className="navbar-greeting">
          Hi, {this.props.userInfo.name}!
        </h2>
      );
      this.userButton = (
        <Link to="/user" id="user-link" className="nav-btn">
          Profile
          <img
            id="fb-pic"
            src={this.props.fbProfPicUrl}
            alt="fb profile pic"
          />
        </Link>
      );
    } else {
      this.greeting = this.notLoggedInGreeting;
      this.userButton = this.fbLoginButton;
    }
    return (
      <div id="nav-bar">
        <Link to="/" className="logo-link nav-btn">
          <img id="logo" src="/images/dartmap.png" role="presentation" />
          <h1 className="app-name">mappit</h1>
        </Link>
        {this.greeting}
        {this.userButton}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    loggedIn: state.user.loggedIn,
    fbProfPicUrl: state.user.fbProfPicUrl,
    userInfo: state.user.userInfo && state.user.userInfo[0],
  }
);

export default connect(mapStateToProps, { login })(NavBar);
