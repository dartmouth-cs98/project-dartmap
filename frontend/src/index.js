// index.js

// import React onto the page
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// add the style sheet onto the page
import './style.scss';

// import the Components
import EventList from './components/event_list';
import NavBar from './components/nav_bar';
import MapContainer from './components/map_container';
import AddEventDialog from './components/add_event_dialog';
import FilterContainer from './components/filter_container';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      addEvent: false,
    };
  }
  render() {
    return (
      <div>
        <NavBar />
        <MapContainer />
        <EventList />
        <FilterContainer />
        <AddEventDialog addEvent={this.state.addEvent} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
