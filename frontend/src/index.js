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
      filters: null,
      addEvent: false,
      eventList: [
        {
          id: '1',
          name: 'test event 1',
          location: 1,
          lat: 43.702732,
          lng: -72.290032,
        },
        {
          id: '2',
          name: 'test event 2',
          location: 2,
          lat: 43.704252,
          lng: -72.294903
        },
        {
          id: '3',
          name: 'test event 3',
          location: 3,
          lat: 43.702141,
          lng: -72.282574,
        },
      ],  // the filtered list of events received from the back-end
      selectedLocation: null,
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <MapContainer events={this.state.eventList} />
        <EventList events={this.state.eventList} selectedLocation={this.state.selectedLocation} />
        <FilterContainer onApplyFilter={filters => this.setState({ filters })} />
        <AddEventDialog addEvent={this.state.addEvent} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
