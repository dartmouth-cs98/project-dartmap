// home.js

// import React onto the page
import React, { Component } from 'react';


// import the API functions
import { postNewEvent, getAllEvents, getAllCategories } from '../helpers/dartmap-api';
import createDateData from '../helpers/date-data-helper';
import { filterDates, filterTimes, sortDateTime } from '../helpers/date-time-filters-helper';
import { filterCategories } from '../helpers/category-filters-helper';

// import the react Components
import EventList from './event_list';
import MapContainer from './map_container';
import AddEventDialog from './add_event_dialog';
import FilterContainer from './filter_container';
import Geolocation from './geolocation';
import LocationModal from './location_modal';

// const TIMES_DATA_DISPLAY = { 0: '8:00 AM', 1: '10:00 AM', 2: '12:00 PM', 3: '2:00 PM', 4: '4:00 PM', 5: '6:00 PM', 6: '8:00 PM', 7: '10:00 PM', 8: '12:00 AM', 9: '2:00 AM' };
const TIMES_DATA_DISPLAY = { 0: 8, 1: 10, 2: 12, 3: 14, 4: 16, 5: 18, 6: 20, 7: 22, 8: 24, 9: 26 };
const DEFAULT_DATE_FILTER = [0, 1];
const DEFAULT_TIME_FILTER = [0, 9];
const MAP_HEIGHT_MULTIPLIER = 0.65;
const MAP_WIDTH_MULTIPLIER = 0.75;
const RADIUS = 10000;

class Home extends Component {
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
      showModal: false,
      categoriesList: [],

      // State variables used for the map.
      selectedLocation: null,
      showBalloonEventId: null,
      showStickyBalloonEventId: null,
      mapHeight: (MAP_HEIGHT_MULTIPLIER * window.innerHeight).toString().concat('px'),
      mapWidth: (MAP_WIDTH_MULTIPLIER * window.innerWidth).toString().concat('px'),
      center: null,
      latitude: null,
      longitude: null,
    };
    this.closeAddEventDialog = this.closeAddEventDialog.bind(this);
    this.handleAddEventData = this.handleAddEventData.bind(this);
    this.showBalloon = this.showBalloon.bind(this);
    this.showStickyBalloon = this.showStickyBalloon.bind(this);
    this.onEventListItemClick = this.onEventListItemClick.bind(this);
    this.toggleAddEvent = this.toggleAddEvent.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.submitModalData = this.submitModalData.bind(this);
    this.handleOpenLocationDialog = this.handleOpenLocationDialog.bind(this);
    this.removePopUps = this.removePopUps.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.onCenterChange = this.onCenterChange.bind(this);
  }

  componentDidMount() {
    // Listener that resizes the map, if the user changes the window dimensions.
    window.addEventListener('resize', () => {
      this.setState({ mapHeight: (MAP_HEIGHT_MULTIPLIER * window.innerHeight).toString().concat('px') });
      this.setState({ mapWidth: (MAP_WIDTH_MULTIPLIER * window.innerWidth).toString().concat('px') });
    }, true);

    getAllCategories(categoriesList => this.setState({ categoriesList }));

  //   getAllEvents((eventList) => {
  //     this.setState({ eventList });
  //     this.setState({ filteredEventList: this.filterEvents(this.state.filters) });
  //   });
  }

  // Things to do when the event list is clicked:
  // 1. Show the sticky baloon if an event list item is clicked.
  onEventListItemClick(eventId, newCenter) {
    if (!this.state.addEvent && (this.state.showStickyBalloonEventId !== eventId)) {
      this.setState({ showStickyBalloonEventId: eventId, center: newCenter });
    }
  }

  onCenterChange(center) {
    this.setState({ center });
  }

  getLocation(latitude, longitude) {
    this.setState({
      latitude,
      longitude,
    }, this.getEvents);
  }

  getEvents() {
    getAllEvents((eventList) => {
      this.setState({ eventList });
      this.setState({ filteredEventList: this.filterEvents(this.state.filters) });
    }, this.state.latitude, this.state.longitude, RADIUS);
  }

  submitModalData(data) {
    this.setState({
      latitude: data.latitude,
      longitude: data.longitude,
    }, this.getEvents);
  }

  handleOpenLocationDialog(error) {
    console.log('error code', error.code);
    this.setState({ showModal: true });
  }

  closeAddEventDialog() {
    this.setState({ addEvent: false });
  }

  handleAddEventData(data) {
    postNewEvent(data);
    this.setState({ addEvent: false }, this.getEvents);
  }

  toggleAddEvent() {
    this.removePopUps();
    this.setState({ addEvent: true });
  }

  // Show balloons with event info on the map.
  // The state is sent to the MapContainer.
  showBalloon(eventId) {
    this.setState({ showBalloonEventId: eventId });
  }

  showStickyBalloon(eventId) {
    if (this.state.showStickyBalloonEventId !== eventId) {
      this.setState({ showStickyBalloonEventId: eventId });
    }
  }

  removePopUps() {
    this.setState({
      showBalloonEventId: null,
      showStickyBalloonEventId: null,
    });

    // // Remove sticky popups.
    // const parent = document.getElementsByTagName('body')[0];
    // const popupsToRemove = document.getElementsByClassName('popup');
    // while (popupsToRemove.length > 0) {
    //   parent.removeChild(popupsToRemove[popupsToRemove.length - 1]);
    // }
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
    if (filters.selectedCategories.length <= 0) {
      // fill with all the categories that exist, so the default is for all categories to be selected
      let i;
      for (i = 0; i < this.state.categoriesList.length; i += 1) {
        console.log(this.state.categoriesList[i]);
        filters.selectedCategories.push(this.state.categoriesList[i]);
      }
    }

    // console.log(this.state.eventList);

    // filter by date, then filter THAT by time
    // TODO: I think we could make this just 3 if statements
    if (filters != null) {
      filteredEvents = this.state.eventList;
      // OLD:
      if ((filters.selectedDate != null) && (filters.selectedTime != null)) {
        filteredEvents = filterDates(filters, this.dateBarData, this.state.eventList);
        filteredEvents = filterTimes(filters, TIMES_DATA_DISPLAY, filteredEvents.slice());
      } else if (filters.selectedDate != null) {
        filteredEvents = filterDates(filters, this.dateBarData, this.state.eventList);
      } else if (filters.selectedTime != null) {
        filteredEvents = filterTimes(filters, TIMES_DATA_DISPLAY, filteredEvents.slice());
      }
      // NEW:
      // if (filters.selectedDate != null) {
      //   filteredEvents = filterDates(filters, this.dateBarData, filteredEvents.slice());
      // }
      // if (filters.selectedTime != null) {
      //   filteredEvents = filterTimes(filters, TIMES_DATA_DISPLAY, filteredEvents.slice());
      // }
      if (filters.selectedCategories.length <= 0) {
        filteredEvents = [];
      } else {
        filteredEvents = filterCategories(filters, this.state.categoriesList, filteredEvents.slice());
      }
    }
    this.setState({ filters, filteredEventList: filteredEvents });

    // sort all filtered events first by date and then by time
    filteredEvents.sort(sortDateTime);

    // only important for the very beginning (see the render() method)
    // console.log(filteredEvents);
    return filteredEvents;
  }

  render() {
    return (
      <div className="home-container">
        <MapContainer
          events={this.state.filteredEventList}
          showBalloonEventId={this.state.showBalloonEventId}
          showStickyBalloonEventId={this.state.showStickyBalloonEventId}
          height={this.state.mapHeight}
          width={this.state.mapWidth}
          center={this.state.center}
          showStickyBalloon={this.showStickyBalloon}
          showBalloon={this.showBalloon}
          removePopUps={this.removePopUps}
          userLocation={{
            lng: this.state.longitude,
            lat: this.state.latitude,
          }}
          onCenterChange={this.onCenterChange}
        />
        <EventList
          toggleAddEvent={this.toggleAddEvent}
          events={this.state.filteredEventList}
          selectedLocation={this.state.selectedLocation}
          showBalloon={this.showBalloon}
          onEventListItemClick={this.onEventListItemClick}
        />
        <FilterContainer
          filterEvents={this.filterEvents}
          onApplyFilter={filters => this.filterEvents(filters)}
          dateBarData={this.dateBarData}
          timeBarData={this.timeBarData}
          categoriesList={this.state.categoriesList}
        />
        <AddEventDialog
          addEvent={this.state.addEvent}
          catList={this.state.categoriesList}
          userLocation={{
            lng: this.state.longitude,
            lat: this.state.latitude,
          }}
          handleAddEventData={this.handleAddEventData}
          closeAddEventDialog={this.closeAddEventDialog}
        />
        <Geolocation
          getLocation={this.getLocation}
          handleOpenLocationDialog={this.handleOpenLocationDialog}
        />
        <LocationModal
          showModal={this.state.showModal}
          submitModalData={this.submitModalData}
        />
      </div>
    );
  }
}

export default Home;
