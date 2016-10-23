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

    this.dateBarData = this.createDateData();
    // this.timeBarData = {}; <-- most likely not necessary
    this.state = {
      filters: null,
      addEvent: true,
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

  /* 
   * creates the date data object based on today's date
   * date data object: {0: Date(), 1: today.getDate()+1, ..., 6: today.getDate()+6, 7: today.getDate()+14}
   */
  createDateData() {
    var today = new Date();
    var obj = {};
    var i;
    // iterate over the week and add in each day
    for (i=0; i<7; i++) {
      var newDate = new Date();
      newDate.setDate(today.getDate()+i)
      obj[i] = newDate;
    }
    // add in the day that is two weeks from now
    var newDate = new Date();
    newDate.setDate(today.getDate()+14)
    obj[7] = newDate;
    return obj;
  }

  render() {
    return (
      <div>
        <NavBar />
        <MapContainer />
        <EventList events={this.state.eventList} selectedLocation={this.state.selectedLocation} />
        <FilterContainer onApplyFilter={filters => this.setState({ filters })} dateBarData={this.dateBarData} timeBarData={this.timeBarData} />
        <AddEventDialog addEvent={this.state.addEvent} />
      </div>
    );
  }
};


ReactDOM.render(<App />, document.getElementById('main'));
