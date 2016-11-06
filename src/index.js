// index.js

// import React onto the page
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// add the style sheet onto the page
import './style.scss';

// import the API functions
import postNewEvent from './helpers/dartmap-api';
import createDateData from './helpers/date-data-helper';

// import the react Components
import EventList from './components/event_list';
import NavBar from './components/nav_bar';
import MapContainer from './components/map_container';
import AddEventDialog from './components/add_event_dialog';
import FilterContainer from './components/filter_container';

// import for time filtering
import moment from 'moment';
// import TimeFilter from './components/time_filter';

const INDEX_OF_MIDNIGHT = 8;
const TIMES_DATA_DISPLAY = { 0: '8:00 AM', 1: '10:00 AM', 2: '12:00 PM', 3: '2:00 PM', 4: '4:00 PM', 5: '6:00 PM', 6: '8:00 PM', 7: '10:00 PM', 8: '12:00 AM', 9: '2:00 AM' };

class App extends Component {
  constructor(props) {
    super(props);
    this.dateBarData = createDateData();
    // this.timeBarData = {}; <-- most likely not necessary
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
          description: 'description1',
          start_time: '12:00 PM',
          end_time: '3:00 PM',
          date: '2016-11-06',
        },
        {
          id: '2',
          name: 'test event 2',
          location: 2,
          lat: 43.704252,
          lng: -72.294903,
          description: 'description2',
          start_time: '2:00 PM',
          end_time: '3:00 PM',
          date: '2016-11-07',
        },
        {
          id: '3',
          name: 'test event 3',
          location: 3,
          lat: 43.702141,
          lng: -72.282574,
          description: 'description3',
          start_time: '4:00 PM',
          end_time: '1:00 AM',
          date: '2016-11-08',
        },
      ],  // the full list of events received from the back-end
      filteredEventList: null,  // the filtered list of events received from the back-end
      selectedLocation: null,
      showBalloonEventId: null,
      showStickyBalloonEventId: null,
    };
    this.handleAddEventData = this.handleAddEventData.bind(this);
    this.showBalloon = this.showBalloon.bind(this);
    this.showStickyBalloon = this.showStickyBalloon.bind(this);
    this.toggleAddEvent = this.toggleAddEvent.bind(this);
  }
  handleAddEventData(data) {
    console.log('data from add-event dialog:');
    console.log(data);
    postNewEvent(data);
    this.setState({ addEvent: false });
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
    var filteredEvents = []
    // filter by date, then filter THAT by time
    if (filters != null) {
      if ((filters.selectedDate != null) && (filters.selectedTime != null)) {
        filteredEvents = this.filterDates(filters, this.dateBarData, this.state.eventList);
        filteredEvents = this.filterTimes(filters, TIMES_DATA_DISPLAY, filteredEvents.slice());
      } else if (filters.selectedDate != null) {
        filteredEvents = this.filterDates(filters, this.dateBarData, this.state.eventList);
      } else if (filters.selectedTime != null) {
        filteredEvents = this.filterTimes(filters, TIMES_DATA_DISPLAY, this.state.eventList);
      }
    }
    this.setState({ filters: filters, filteredEventList: filteredEvents });
    console.log("filtered list of events:");
    console.log(filteredEvents);
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
      var eventDate = moment(eventList[i]['date']).date();
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
    // this.filterEvents();
    return (
      <div>
        <NavBar toggleAddEvent={this.toggleAddEvent} />
        <MapContainer events={this.state.eventList}
          showBalloonEventId={this.state.showBalloonEventId}
          showStickyBalloonEventId={this.state.showStickyBalloonEventId}
        />
        <EventList events={this.state.eventList} selectedLocation={this.state.selectedLocation}
          showBalloon={this.showBalloon} showStickyBalloon={this.showStickyBalloon}
        />
        <FilterContainer filterEvents={this.filterEvents} onApplyFilter={filters => this.filterEvents(filters)} dateBarData={this.dateBarData} timeBarData={this.timeBarData} />
        <AddEventDialog addEvent={this.state.addEvent} handleAddEventData={this.handleAddEventData} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
