// app.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import components
import NavBar from './nav_bar';

// import helper functions
// import { postFbToken, getUserByPassword, getAllUsers } from '../helpers/dartmap-api';

// import the redux actions
import {
  getLocation, fetchCategories, setDateBarData, getLoginStatusFromFb,
} from '../actions';

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
    return (
      <div className="app-container">
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getLocation,
  fetchCategories,
  setDateBarData,
  getLoginStatusFromFb,
};

export default connect(null, mapDispatchToProps)(App);
