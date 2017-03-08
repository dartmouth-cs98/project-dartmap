// app.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import components
import NavBar from './nav_bar';

// import helper functions
// import { postFbToken, getUserByPassword, getAllUsers } from '../helpers/dartmap-api';

// import the redux actions
import { getLocation, fetchCategories, setDateBarData } from '../actions';

import { fbAsyncInit } from '../helpers/facebook-helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.setDateBarData();
    this.props.getLocation();
    this.props.fetchCategories();
  }

  componentWillMount() {
    fbAsyncInit();
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
};

export default connect(null, mapDispatchToProps)(App);
