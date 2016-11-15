// index.js

// import React onto the page
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// add the style sheet onto the page
import './style.scss';

// import the API functions
import { postNewEvent, getAllEvents } from './helpers/dartmap-api';
import createDateData from './helpers/date-data-helper';
import { filterDates, filterTimes, sortDateTime } from './helpers/date-time-filters-helper';
// import filterTimes from './helpers/date-time-filters-helper';

// import the react Components
import EventList from './components/event_list';
import NavBar from './components/nav_bar';
import MapContainer from './components/map_container';
import AddEventDialog from './components/add_event_dialog';
import FilterContainer from './components/filter_container';

// const TIMES_DATA_DISPLAY = { 0: '8:00 AM', 1: '10:00 AM', 2: '12:00 PM', 3: '2:00 PM', 4: '4:00 PM', 5: '6:00 PM', 6: '8:00 PM', 7: '10:00 PM', 8: '12:00 AM', 9: '2:00 AM' };
const TIMES_DATA_DISPLAY = { 0: 8, 1: 10, 2: 12, 3: 14, 4: 16, 5: 18, 6: 20, 7: 22, 8: 24, 9: 26 };
const DEFAULT_DATE_FILTER = [0, 1];
const DEFAULT_TIME_FILTER = [0, 9];
const MAP_HEIGHT_MULTIPLIER = 0.65;
const MAP_WIDTH_MULTIPLIER = 0.8;

class App extends Component {
  constructor(props) {
    super(props);
    this.dateBarData = createDateData();
    // this.timeBarData = {}; <-- most likely not necessary
    this.state = {
      filters: {
        selectedDate: null,
        selectedTime: null,
        selectedCategories: [],
      },
      addEvent: false,
      filteredEventList: [],  // the filtered list of events received from the back-end
      eventList: [],  // the full list of events received from the back-end
      selectedLocation: null,
      showBalloonEventId: null,
      showStickyBalloonEventId: null,
      mapHeight: (MAP_HEIGHT_MULTIPLIER * window.innerHeight).toString().concat('px'),
      mapWidth: (MAP_WIDTH_MULTIPLIER * window.innerWidth).toString().concat('px'),
      center: [43.703337, -72.288578],
    };
    this.closeAddEventDialog = this.closeAddEventDialog.bind(this);
    this.handleAddEventData = this.handleAddEventData.bind(this);
    this.showBalloon = this.showBalloon.bind(this);
    this.onEventListItemClick = this.onEventListItemClick.bind(this);
    this.toggleAddEvent = this.toggleAddEvent.bind(this);
    this.filterEvents = this.filterEvents.bind(this);

    window.addEventListener('resize', () => {
      this.setState({ mapHeight: (MAP_HEIGHT_MULTIPLIER * window.innerHeight).toString().concat('px') });
      this.setState({ mapWidth: (MAP_WIDTH_MULTIPLIER * window.innerWidth).toString().concat('px') });
    }, true);
  }
  componentDidMount() {
    getAllEvents((eventList) => {
      this.setState({ eventList });
      this.setState({ filteredEventList: this.filterEvents(this.state.filters) });
    });
  }
  onEventListItemClick(eventId, newCenter) {
    this.setState({ showStickyBalloonEventId: eventId, center: newCenter });

    // Reset the state so that the popup is a onetime popup.
    setTimeout(() => {
      this.setState({ showStickyBalloonEventId: null });
    }, 1000);
  }
  closeAddEventDialog() {
    this.setState({ addEvent: false });
  }
  handleAddEventData(data) {
    console.log('data from add-event dialog:');
    console.log(data);
    postNewEvent(data);
    this.setState({ addEvent: false });
    getAllEvents((eventList) => {
      this.setState({ eventList });
      this.setState({ filteredEventList: this.filterEvents(this.state.filters) });
    });
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
  filterEvents(theFilters) {
    let filteredEvents = [];
    const filters = theFilters;

    if (filters.selectedDate == null) {
      filters.selectedDate = DEFAULT_DATE_FILTER;
    }
    if (filters.selectedTime == null) {
      filters.selectedTime = DEFAULT_TIME_FILTER;
    }

    // filter by date, then filter THAT by time
    if (filters != null) {
      if ((filters.selectedDate != null) && (filters.selectedTime != null)) {
        filteredEvents = filterDates(filters, this.dateBarData, this.state.eventList);
        filteredEvents = filterTimes(filters, TIMES_DATA_DISPLAY, filteredEvents.slice());
      } else if (filters.selectedDate != null) {
        filteredEvents = filterDates(filters, this.dateBarData, this.state.eventList);
      } else if (filters.selectedTime != null) {
        filteredEvents = filterTimes(filters, TIMES_DATA_DISPLAY, filteredEvents.slice());
      }
    }
    this.setState({ filters, filteredEventList: filteredEvents });

    // sort all filtered events first by date and then by time
    filteredEvents.sort(sortDateTime);

    // only important for the very beginning (see the render() method)
    return filteredEvents;
  }

  render() {
    return (
      <div className="app-container">
        <NavBar toggleAddEvent={this.toggleAddEvent} />
        <div className="home-container">
          <MapContainer events={this.state.filteredEventList}
            showBalloonEventId={this.state.showBalloonEventId}
            showStickyBalloonEventId={this.state.showStickyBalloonEventId}
            height={this.state.mapHeight}
            width={this.state.mapWidth}
            center={this.state.center}
          />
          <EventList events={this.state.filteredEventList} selectedLocation={this.state.selectedLocation}
            showBalloon={this.showBalloon} onEventListItemClick={this.onEventListItemClick}
          />
          <FilterContainer filterEvents={this.filterEvents} onApplyFilter={filters => this.filterEvents(filters)} dateBarData={this.dateBarData} timeBarData={this.timeBarData} />
          <AddEventDialog addEvent={this.state.addEvent}
            handleAddEventData={this.handleAddEventData}
            closeAddEventDialog={this.closeAddEventDialog}
          />
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
