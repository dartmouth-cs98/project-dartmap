// index.js

// import React onto the page
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// add the style sheets onto the page
import 'react-datetime/css/react-datetime.css';
import 'rc-slider/assets/index.css';
import 'react-select/dist/react-select.css';
import './style/style.scss';

// Component imports
import NavBar from './components/nav_bar';
import Home from './components/home';
import UserPage from './components/user_page';
import EventPage from './components/event_page';

// Helper function imports
import { fbAsyncInit, getFbLoginStatus, setFbLoginStatus, processLoggedInUser, handleFbLoginClick, getFbProfileImageUrl, getFbUserInfo } from './helpers/facebook-helpers';

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
  }

  componentDidMount() {
    fbAsyncInit();
    setTimeout(() => {
      this.checkFbLoginStatus();
    }, 1000);
  }

  checkFbLoginStatus(){
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

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/user" component={UserPage} />
      <Route path="/events/:id" component={EventPage} />
    </Route>
  </Router>
), document.getElementById('main'));
