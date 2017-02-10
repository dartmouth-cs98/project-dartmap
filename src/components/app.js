// app.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import components
import NavBar from './nav_bar';

// import helper functions
import { postFbToken, getUserByPassword, getAllUsers } from '../helpers/dartmap-api';

// import the redux actions
import { fetchEvents } from '../actions';

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
    this.checkLoginState = this.checkLoginState.bind(this);
    this.handleImageResponse = this.handleImageResponse.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.props.fetchEvents();
  }

  componentDidMount() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '240355553073589',
        cookie: true,   // enable cookies to allow the server to access
                        // the session
        xfbml: true,    // parse social plugins on this page
        version: 'v2.8', // use version 2.8
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      this.checkLoginState(100);
    }.bind(this);

    // Load the SDK asynchronously
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  checkLoginState(timeoutTime) {
    setTimeout(() => {
      FB.getLoginStatus((response) => {
        console.log(response);
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          this.setState({ logged_in: true });
          postFbToken(response.authResponse);
          if (response.authResponse.userID) {
            getUserByPassword(userInfo => this.setState({ userInfo }), response.authResponse.userID);
            const fbUserUrl = `/${response.authResponse.userID}/picture`;
            FB.api(
              fbUserUrl,
              this.handleImageResponse
            );
          }
        // } else if (response.status === 'not_authorized') {
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          this.setState({ logged_in: false });
        }
      });
    }, timeoutTime);
  }

  handleImageResponse(resp) {
    if (resp && !resp.error) {
      this.setState({ fb_profile_image_url: resp.data.url });
    }
  }

  handleLoginClick() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        this.setState({ logged_in: true });
      } else {
        FB.login(this.checkLoginState(8000));
      }
    });
  }

  handleLogoutClick() {
    this.setState({ logged_in: false });
    FB.logout();
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

export default connect(null, { fetchEvents })(App);
