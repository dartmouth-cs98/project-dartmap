// app.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import components
import NavBar from './nav_bar';

// import helper functions
// import { postFbToken, getUserByPassword, getAllUsers } from '../helpers/dartmap-api';

// import the redux actions
import { getLocation, fetchCategories, setDateBarData } from '../actions';

// Helper function imports
import { fbAsyncInit, getFbLoginStatus, setFbLoginStatus, processLoggedInUser, handleFbLoginClick, getFbProfileImageUrl, getFbUserInfo } from '../helpers/facebook-helpers';

/* global FB:true */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      fb_profile_image_url: null,
      fb_user_id: null,
      userInfo: null,
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.checkFbLoginStatus = this.checkFbLoginStatus.bind(this);
    this.props.setDateBarData();
    this.props.getLocation();
    this.props.fetchCategories();
  }

  componentDidMount() {
    fbAsyncInit();
    setTimeout(() => {
      this.checkFbLoginStatus();
    }, 1000);
  }

  checkFbLoginStatus() {
    const fbLoginStatus = setFbLoginStatus();
    setTimeout(() => {
      const fbLoginStatus = getFbLoginStatus();
      if (fbLoginStatus.status === 'connected') {
        this.setState({ logged_in: true });
        processLoggedInUser(fbLoginStatus);
        setTimeout(() => {
          const fb_profile_image_url = getFbProfileImageUrl();
          this.setState({ fb_profile_image_url });
          const userInfo = getFbUserInfo();
          this.setState({ userInfo });
        }, 2000);
      } else {
        this.setState({ logged_in: false });
      }
    }, 2000);
  }

  handleLoginClick() {
    handleFbLoginClick();
    setTimeout(() => {
      this.checkFbLoginStatus();
    }, 8000);
  }

  render() {
    // if we have the user information, send it to the NavBar, otherwise, do not
    return (
      <div className="app-container">
        <NavBar logged_in={this.state.logged_in}
          fb_profile_image_url={this.state.fb_profile_image_url}
          handleLoginClick={this.handleLoginClick}
          userInfo={(this.state.userInfo != null) ? this.state.userInfo[0] : null}
        />
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, { getLocation, fetchCategories, setDateBarData })(App);
