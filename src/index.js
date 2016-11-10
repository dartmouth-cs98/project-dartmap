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

// import for time filtering
import moment from 'moment';

const INDEX_OF_MIDNIGHT = 8;
const TIMES_DATA_DISPLAY = { 0: '8:00 AM', 1: '10:00 AM', 2: '12:00 PM', 3: '2:00 PM', 4: '4:00 PM', 5: '6:00 PM', 6: '8:00 PM', 7: '10:00 PM', 8: '12:00 AM', 9: '2:00 AM' };
const DEFAULT_DATE_FILTER = [0,1]
const DEFAULT_TIME_FILTER = [0,9]

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
      filteredEventList: null,  // the filtered list of events received from the back-end
      eventList: [],  // the full list of events received from the back-end
      selectedLocation: null,
      showBalloonEventId: null,
      showStickyBalloonEventId: null,
    };
    this.handleAddEventData = this.handleAddEventData.bind(this);
    this.showBalloon = this.showBalloon.bind(this);
    this.showStickyBalloon = this.showStickyBalloon.bind(this);
    this.toggleAddEvent = this.toggleAddEvent.bind(this);
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
  filterEvents(filters) {
    console.log("filters::::::::::::");
    console.log(filters);

    console.log("this.state.eventList:");
    console.log(this.state.eventList);
    console.log("this.state.filteredEventList:");
    console.log(this.state.filteredEventList);

    var filteredEvents = []

    if (filters.selectedDate == null) {
      filters.selectedDate = DEFAULT_DATE_FILTER;
    }
    if (filters.selectedTime == null) {
      filters.selectedTime = DEFAULT_TIME_FILTER;
    }

    console.log("filters:::::2::::::");
    console.log(filters);

    // filter by date, then filter THAT by time
    if (filters != null) {
      if ((filters.selectedDate != null) && (filters.selectedTime != null)) {
        filteredEvents = this.filterDates(filters, this.dateBarData, this.state.eventList);
        filteredEvents = this.filterTimes(filters, TIMES_DATA_DISPLAY, filteredEvents.slice());
      } else if (filters.selectedDate != null) {
        filteredEvents = this.filterDates(filters, this.dateBarData, this.state.eventList);
      } else if (filters.selectedTime != null) {
        filteredEvents = this.filterDates(filters, this.dateBarData, this.state.eventList);
      }
    }
    this.setState({ filters: filters, filteredEventList: filteredEvents });

    // only important for the very beginning (see the render() method)
    return filteredEvents;
  }
  // 
  filterDates(filters, dateKey, eventList) {
    var filterDates = [];
    var filteredEvents = [];
    // iterate through each selected date
    var i;
    for (i = 0; i < filters.selectedDate.length; i += 1) {
      var dateIdx = filters.selectedDate[i];
      // add to list as int day of month
      filterDates.push(dateKey[dateIdx].getDate());
    }
    for (i = 0; i < eventList.length; i+=1) {
      var event = eventList[i];
      var eventDate = eventList[i]['date'].date();
      console.log("date:");
      console.log(eventDate);
      // if this date is one of the allowed filter dates
      if (filterDates.indexOf(eventDate) >= 0) {
        filteredEvents.push(event);
      }
      filterDates.push(dateKey[dateIdx].getDate());
    }
    return filteredEvents;
  }
  // takes in all filters and the list of events and returns a list of only the events that pass through the filter
  filterTimes(filters, timeKey, eventList) {
    // NOTE: WILL NEED A SPECIAL EXCEPTION FOR WHEN SELECT NEXT 2 WEEKS FOR FILTERDATES
    var startTime;
    var endTime;
    var startIdx = filters.selectedTime[0];
    var endIdx = filters.selectedTime[1];

    if (startIdx < INDEX_OF_MIDNIGHT) {
      startTime = '01/01/2010 ' + timeKey[startIdx];
    } else {
      startTime = '01/02/2010 ' + timeKey[startIdx];
    }
    if (endIdx < INDEX_OF_MIDNIGHT) {
      endTime = '01/01/2010 ' + timeKey[endIdx];
    } else {
      endTime = '01/02/2010 ' + timeKey[endIdx];
    }
    var filteredEvents = [];
    var i = 0;
    for (i = 0; i < eventList.length; i+=1) {
      var dayTime = null;
      if (i < INDEX_OF_MIDNIGHT) {
        dayTime = '01/01/2010 ' + eventList[i]['start_time'];
      } else {
        dayTime = '01/02/2010 ' + eventList[i]['start_time'];
      }
      if (moment(dayTime).isSameOrAfter(startTime)) {
        if (moment(dayTime).isSameOrBefore(endTime)) {
          filteredEvents.push(eventList[i]);
        }
      }
    }
    return filteredEvents;
  }
  render() {
    // sets the filtered event list at the very beginning
    if (this.state.filteredEventList == null) {
      this.state.filteredEventList = this.filterEvents(this.state.filters);;
      console.log("filters:");
      console.log(this.state.filters);
      console.log("filtered event list:");
      console.log(this.state.filteredEventList);
    }
    return (
      <div className="app-container">
        <NavBar toggleAddEvent={this.toggleAddEvent} />
        <div className="home-container">
          <MapContainer events={this.state.filteredEventList}
            showBalloonEventId={this.state.showBalloonEventId}
            showStickyBalloonEventId={this.state.showStickyBalloonEventId}
          />
          <EventList events={this.state.filteredEventList} selectedLocation={this.state.selectedLocation}
            showBalloon={this.showBalloon} showStickyBalloon={this.showStickyBalloon}
          />
          <FilterContainer filterEvents={this.filterEvents} onApplyFilter={filters => this.filterEvents(filters)} dateBarData={this.dateBarData} timeBarData={this.timeBarData} />
          <AddEventDialog addEvent={this.state.addEvent} handleAddEventData={this.handleAddEventData} />
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
