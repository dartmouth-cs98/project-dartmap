// home.js

// import React onto the page
import React, { Component } from 'react';
import { connect } from 'react-redux';


// import the API functions
import { getAllCategories, getAllUsers } from '../helpers/dartmap-api';

// import the react Components
import EventList from './event_list';
import MapContainer from './map_container';
import AddEventDialog from './add_event_dialog';
import FilterContainer from './filter_container';
import Geolocation from './geolocation';
import LocationModal from './location_modal';

// import the redux actions
import { fetchEvents } from '../actions';

const MAP_HEIGHT_MULTIPLIER = 0.65;
const MAP_WIDTH_MULTIPLIER = 0.75;
const RADIUS = 10000;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addEvent: false,
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
  }

  // Things to do when the event list is clicked:
  // 1. Show the sticky baloon if an event list item is clicked.
  onEventListItemClick(eventId, newCenter) {
    if (!this.state.addEvent && (this.state.showStickyBalloonEventId !== eventId)) {
      this.setState({ showStickyBalloonEventId: eventId, center: newCenter });

      // // Reset the state so that the popup is a onetime popup.
      // setTimeout(() => {
      //   this.setState({ showStickyBalloonEventId: null });
      // }, 1000);
    }
  }

  onCenterChange(center) {
    console.log(center);
    this.setState({ center });
  }

  getLocation(latitude, longitude) {
    this.setState({
      latitude,
      longitude,
    }, this.getEvents);
  }

  getEvents() {
    this.props.fetchEvents(this.state.latitude, this.state.longitude, RADIUS);
    // getAllEvents((eventList) => {
    //   this.setState({ eventList });
    //   this.setState({ filteredEventList: this.filterEvents(this.state.filters) });
    // }, this.state.latitude, this.state.longitude, RADIUS);
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

      // // Reset the state so that the popup is a onetime popup.
      // setTimeout(() => {
      //   this.setState({ showStickyBalloonEventId: null });
      // }, 1000);
    }
  }

  removePopUps() {
    this.setState({
      showBalloonEventId: null,
      showStickyBalloonEventId: null,
    });
  }

  render() {
    return (
      <div className="home-container">
        <MapContainer
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
          selectedLocation={this.state.selectedLocation}
          showBalloon={this.showBalloon}
          onEventListItemClick={this.onEventListItemClick}
        />
        <FilterContainer
          filterEvents={this.filterEvents}
          onApplyFilter={filters => this.filterEvents(filters)}
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

const mapStateToProps = state => (
  {
    events: state.events.all,
  }
);

export default connect(mapStateToProps, { fetchEvents })(Home);
