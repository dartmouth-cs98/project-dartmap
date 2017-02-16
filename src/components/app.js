// app.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import components
import NavBar from './nav_bar';

// import helper functions
// import { postFbToken, getUserByPassword, getAllUsers } from '../helpers/dartmap-api';

// import the redux actions
import { getLocation, fetchCategories, setDateBarData, getLoginStatusFromFb, login } from '../actions';

import { fbAsyncInit } from '../helpers/facebook-helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.setDateBarData();
    this.props.getLocation();
    this.props.fetchCategories();
    this.initialFbLoad = false;
  }

  componentWillMount() {
    fbAsyncInit();
  }

  componentWillUpdate() {
    if (!this.initialFbLoad && window.FB) {
      this.props.getLoginStatusFromFb();
      this.initialFbLoad = true;
    }
  }

  render() {
    const user = this.props.user;
    // if we have the user information, send it to the NavBar, otherwise, do not
    const userInfo = (user && user.userInfo && user.userInfo[0]);
    return (
      <div className="app-container">
        <NavBar logged_in={this.props.user.loggedIn}
          fb_profile_image_url={this.props.user.fbProfPicUrl}
          handleLoginClick={this.props.login}
          userInfo={userInfo}
        />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.user,
  }
);

export default connect(mapStateToProps, { getLocation, fetchCategories, setDateBarData, getLoginStatusFromFb, login })(App);
