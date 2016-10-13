// index.js

//import React onto the page
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//add the style sheet onto the page
import './style.scss';

//import the Components
import EventList from './components/event_list';


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <EventList />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
