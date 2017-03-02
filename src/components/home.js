// home.js

// import React onto the page
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import the react Components
import EventList from './event_list';
import MapContainer from './map_container';
import AddEventDialog from './add_event_dialog';
import FilterContainer from './filter_container';
import LocationDialog from './location_dialog';

// import the redux actions
import { fetchEvents, getLocation, clearBalloons } from '../actions';

const MAP_HEIGHT_MULTIPLIER = 0.65;
const MAP_WIDTH_MULTIPLIER = 0.75;
const RADIUS = 10000;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addEvent: false,
      showModal: false,
      // State variables used for the map.
      selectedLocation: null,
      mapHeight: (MAP_HEIGHT_MULTIPLIER * window.innerHeight).toString().concat('px'),
      mapWidth: (MAP_WIDTH_MULTIPLIER * window.innerWidth).toString().concat('px'),
    };
    this.closeAddEventDialog = this.closeAddEventDialog.bind(this);
    this.handleAddEventData = this.handleAddEventData.bind(this);
    this.toggleAddEvent = this.toggleAddEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.toggleGeolocation = this.toggleGeolocation.bind(this);
  }

  componentWillMount() {
    if (this.props.latitude === 'retry' && this.props.longitude === 'retry') {
      this.props.getLocation();
    }
  }

  componentDidMount() {
    this.getEvents();
    // Listener that resizes the map, if the user changes the window dimensions.
    window.addEventListener('resize', () => {
      this.setState({ mapHeight: (MAP_HEIGHT_MULTIPLIER * window.innerHeight).toString().concat('px') });
      this.setState({ mapWidth: (MAP_WIDTH_MULTIPLIER * window.innerWidth).toString().concat('px') });
    }, true);
  }

  componentWillUpdate(nextProps, nextState) {
    if ((!this.props.events) || (this.props.events[0] === 'retry')) {
      if (this.props.latitude && this.props.longitude) {
        this.getEvents();
      }
    }
    if (this.props.latitude && this.props.longitude && (nextProps.latitude !== this.props.latitude || nextProps.longitude !== this.props.longitude)) {
      this.props.fetchEvents(nextProps.atitude, nextProps.longitude, RADIUS);
    }
  }

  getEvents() {
    this.props.fetchEvents(this.props.latitude, this.props.longitude, RADIUS);
  }

  closeAddEventDialog() {
    this.setState({ addEvent: false });
  }

  handleAddEventData(data) {
    this.setState({ addEvent: false }, this.getEvents);
  }

  toggleAddEvent() {
    this.props.clearBalloons();
    this.setState({ addEvent: true });
  }

  toggleGeolocation() {
    this.setState({ showModal: !this.state.showModal });
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
          height={this.state.mapHeight}
          width={this.state.mapWidth}
        />
        <EventList
          toggleAddEvent={this.toggleAddEvent}
          selectedLocation={this.state.selectedLocation}
          toggleGeolocation={this.toggleGeolocation}
        />
        <FilterContainer />
        <AddEventDialog
          addEvent={this.state.addEvent}
          handleAddEventData={this.handleAddEventData}
          closeAddEventDialog={this.closeAddEventDialog}
        />
        <LocationDialog showModal={this.state.showModal} handleClose={this.toggleGeolocation} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    events: state.events.all,
    latitude: state.user.latitude,
    longitude: state.user.longitude,
    user: state.user,
  }
);

const mapDispatchToProps = { fetchEvents, getLocation, clearBalloons };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
