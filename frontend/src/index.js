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
          id: 1,
          name: 'test event 1',
          location: 1,
        },
        {
          id: 2,
          name: 'test event 2',
          location: 2,
        },
        {
          id: 3,
          name: 'test event 3',
          location: 3,
        },
      ],  // the filtered list of events received from the back-end
      selectedLocation: null,
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <MapContainer />
        <EventList events={this.state.eventList} selectedLocation={this.state.selectedLocation} />
        <FilterContainer onApplyFilter={filters => this.setState({ filters })} />
        <AddEventDialog addEvent={this.state.addEvent} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
