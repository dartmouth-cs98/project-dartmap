// home.js

// import React onto the page
import React, { Component } from 'react';
import { connect } from 'react-redux';


// import the API functions
import { getAllCategories } from '../helpers/dartmap-api';

// import the react Components
import EventList from './event_list';
import MapContainer from './map_container';
import AddEventDialog from './add_event_dialog';
import FilterContainer from './filter_container';
import LocationDialog from './location_dialog';

// import the redux actions
import { fetchEvents, getLocation } from '../actions';

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
    };
    this.closeAddEventDialog = this.closeAddEventDialog.bind(this);
    this.handleAddEventData = this.handleAddEventData.bind(this);
    this.showBalloon = this.showBalloon.bind(this);
    this.showStickyBalloon = this.showStickyBalloon.bind(this);
    this.onEventListItemClick = this.onEventListItemClick.bind(this);
    this.toggleAddEvent = this.toggleAddEvent.bind(this);
    this.removePopUps = this.removePopUps.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.onCenterChange = this.onCenterChange.bind(this);
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

    getAllCategories(categoriesList => this.setState({ categoriesList }));
  }

  componentWillUpdate() {
    if ((!this.props.events) || (this.props.events[0] === 'retry')) {
      if (this.props.latitude && this.props.longitude) {
        this.getEvents();
      }
    }
  }

  // Things to do when the event list is clicked:
  // 1. Show the sticky baloon if an event list item is clicked.
  onEventListItemClick(eventId, newCenter) {
    if (!this.state.addEvent && this.state.showStickyBalloonEventId !== eventId) {
      this.setState({ showStickyBalloonEventId: eventId, center: newCenter });
    }
  }

  onCenterChange(center) {
    this.setState({ center });
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

  render() {
    let showModal = false;
    if (this.props.latitude === null && this.props.longitude === null) {
      showModal = true;
    }
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
          onCenterChange={this.onCenterChange}
        />
        <EventList
          toggleAddEvent={this.toggleAddEvent}
          selectedLocation={this.state.selectedLocation}
          showBalloon={this.showBalloon}
          onEventListItemClick={this.onEventListItemClick}
        />
        <FilterContainer
          categoriesList={this.state.categoriesList}
        />
        <AddEventDialog
          addEvent={this.state.addEvent}
          catList={this.state.categoriesList}
          handleAddEventData={this.handleAddEventData}
          closeAddEventDialog={this.closeAddEventDialog}
        />
        <LocationDialog
          showModal={showModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    events: state.events.all,
    latitude: state.user.latitude,
    longitude: state.user.longitude,
  }
);

export default connect(mapStateToProps, { fetchEvents, getLocation })(Home);
