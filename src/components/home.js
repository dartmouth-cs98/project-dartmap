// home.js

// import React onto the page
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FloatingActionButton } from 'material-ui';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';

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
      this.props.fetchEvents(nextProps.latitude, nextProps.longitude, RADIUS);
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
  }

  render() {
    return (
      <div className="home-container">
        <div className="mapAndButton">
          <MapContainer
            height={this.state.mapHeight}
            width={this.state.mapWidth}
          />
          <FloatingActionButton className="geoButton" onClick={this.toggleGeolocation}>
            <MapsMyLocation />
          </FloatingActionButton>
        </div>
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
