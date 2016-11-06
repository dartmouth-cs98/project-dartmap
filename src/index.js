// index.js

// import React onto the page
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// add the style sheet onto the page
import './style.scss';

// import the API functions
import { postNewEvent, getAllEvents } from './helpers/dartmap-api';
import createDateData from './helpers/date-data-helper';

// import the react Components
import EventList from './components/event_list';
import NavBar from './components/nav_bar';
import MapContainer from './components/map_container';
import AddEventDialog from './components/add_event_dialog';
import FilterContainer from './components/filter_container';

class App extends Component {
  constructor(props) {
    super(props);
    this.dateBarData = createDateData();
    // this.timeBarData = {}; <-- most likely not necessary
    this.state = {
      filters: null,
      addEvent: false,
      eventList: [],  // the filtered list of events received from the back-end
      selectedLocation: null,
      showBalloonEventId: null,
      showStickyBalloonEventId: null,
      mapHeight: (0.8 * window.innerHeight).toString().concat('px'),
      mapWidth:(0.8 * window.innerWidth).toString().concat('px'),
    };
    this.closeAddEventDialog = this.closeAddEventDialog.bind(this);
    this.handleAddEventData = this.handleAddEventData.bind(this);
    this.showBalloon = this.showBalloon.bind(this);
    this.showStickyBalloon = this.showStickyBalloon.bind(this);
    this.toggleAddEvent = this.toggleAddEvent.bind(this);

    window.addEventListener('resize', function() {
      this.setState({ mapHeight: (0.8 * window.innerHeight).toString().concat('px') });
      this.setState({ mapWidth: (0.8 * window.innerWidth).toString().concat('px') });
    }.bind(this), true);
  }
  closeAddEventDialog() {
    this.setState({ addEvent: false });
  }
  componentDidMount() {
    getAllEvents((eventList) => { this.setState({ eventList }); });
  }
  handleAddEventData(data) {
    console.log('data from add-event dialog:');
    console.log(data);
    postNewEvent(data);
    this.setState({ addEvent: false });
    getAllEvents((eventList) => { this.setState({ eventList }); });
  }
  toggleAddEvent() {
    this.setState({ addEvent: true });
  }
  showBalloon(eventId) {
    this.setState({ showBalloonEventId: eventId });
  }
  showStickyBalloon(eventId) {
    this.setState({ showStickyBalloonEventId: eventId });

    // Reset the state so that the popup is a onetime popup.
    setTimeout(() => {
      this.setState({ showStickyBalloonEventId: null });
    }, 1000);
  }
  render() {
    return (
      <div>
        <NavBar toggleAddEvent={this.toggleAddEvent} />
        <MapContainer events={this.state.eventList}
          showBalloonEventId={this.state.showBalloonEventId}
          showStickyBalloonEventId={this.state.showStickyBalloonEventId}
          height={this.state.mapHeight}
          width={this.state.mapWidth}
        />
        <EventList events={this.state.eventList} selectedLocation={this.state.selectedLocation}
          showBalloon={this.showBalloon} showStickyBalloon={this.showStickyBalloon}
        />
        <FilterContainer onApplyFilter={filters => this.setState({ filters })} dateBarData={this.dateBarData} timeBarData={this.timeBarData} />
        <AddEventDialog addEvent={this.state.addEvent}
          handleAddEventData={this.handleAddEventData} 
          closeAddEventDialog={this.closeAddEventDialog}
        />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
