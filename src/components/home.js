// home.js

// import React onto the page
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IconButton } from 'material-ui';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';
import MapsNavigation from 'material-ui/svg-icons/maps/navigation';

// import the react Components
import EventList from './event_list';
import MapContainer from './map_container';
import AddEventDialog from './add_event_dialog';
import FilterContainer from './filter_container';
import LocationDialog from './location_dialog';

// import the redux actions
import { fetchEvents, getLocation, clearBalloons, setMapCenter } from '../actions';

const MAP_HEIGHT_MULTIPLIER = 0.75;
const MAP_WIDTH_MULTIPLIER = 0.95;
const RADIUS = 10000;

class Home extends Component {
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.state = {
      addEvent: false,
      showModal: false,
      // State variables used for the map.
      selectedLocation: null,
      mapHeight: (MAP_HEIGHT_MULTIPLIER * window.innerHeight).toString().concat('px'),
      mapWidth: (MAP_WIDTH_MULTIPLIER * window.innerWidth).toString().concat('px'),
      showBtns: false,
    };
  }

  componentWillMount() {
    if (this.props.latitude === 'retry' && this.props.longitude === 'retry') {
      this.props.getLocation();
    }
  }

  componentDidMount() {
    this.getEvents();
    // Listener that resizes the map, if the user changes the window dimensions.
    console.log("mounting");
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount () {
    console.log("unmounting");
    window.removeEventListener('resize', this.onResize);
  }

  componentWillUpdate(nextProps, nextState) {
    if ((!this.props.eventList) || (this.props.eventList[0] === 'retry')) {
      if (this.props.latitude && this.props.longitude) {
        this.getEvents();
      }
    }
    if (nextProps.latitude !== this.props.latitude || nextProps.longitude !== this.props.longitude) {
      this.props.fetchEvents(nextProps.latitude, nextProps.longitude, RADIUS);
    }
  }

  onResize() {
    this.setState({ mapHeight: (MAP_HEIGHT_MULTIPLIER * window.innerHeight).toString().concat('px') });
    this.setState({ mapWidth: (MAP_WIDTH_MULTIPLIER * window.innerWidth).toString().concat('px') });
  }

  getEvents = () => {
    this.props.fetchEvents(this.props.latitude, this.props.longitude, RADIUS);
  }

  closeAddEventDialog = () => {
    this.setState({ addEvent: false });
  }

  handleAddEventData = (data) => {
    this.setState({ addEvent: false }, this.getEvents);
  }

  toggleAddEvent = () => {
    this.props.clearBalloons();
    this.setState({ addEvent: true });
  }

  toggleGeolocation = () => {
    this.setState({ showModal: !this.state.showModal });
    this.setState({ showBtns: false });
  }

  toggleSettings = () => {
    this.setState({ showBtns: !this.state.showBtns });
  }

  refocusLocation = () => {
    this.props.setMapCenter({ lat: this.props.latitude, lng: this.props.longitude });
    this.setState({ showBtns: false });
  }

  render() {
    let SettingsButton;
    if (this.state.showBtns) {
      SettingsButton = (
        <div>
          <IconButton className="geoButtonSub" style={{ position: 'absolute', marginTop: '10px' }} onClick={this.refocusLocation}>
            <MapsMyLocation />
          </IconButton>
          <IconButton className="geoButtonSubSub" style={{ position: 'absolute', marginTop: '20px' }} onClick={this.toggleGeolocation}>
            <MapsNavigation />
          </IconButton>
        </div>
      );
    } else {
      SettingsButton = (
        <div />
      );
    }

    return (
      <div className="home-container" style={{ marginTop: '60px' }}>
        <EventList
          toggleAddEvent={this.toggleAddEvent}
          selectedLocation={this.state.selectedLocation}
          toggleGeolocation={this.toggleGeolocation}
        />
        <div className="mapAndButton">
          <MapContainer
            height={this.state.mapHeight}
            width={this.state.mapWidth}
          />
          <IconButton className="geoButton" style={{ position: 'absolute' }} onClick={this.toggleSettings}>
            <ActionSettings />
          </IconButton>
          {SettingsButton}
        </div>
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
    eventList: state.events.all,
    latitude: state.user.latitude,
    longitude: state.user.longitude,
    user: state.user,
    // eventData: state.events,
    mapCenter: state.map.center,
  }
);

const mapDispatchToProps = { fetchEvents, getLocation, clearBalloons, setMapCenter };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
