// home.js

// import React onto the page
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IconButton, FloatingActionButton } from 'material-ui';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';
import MapsNavigation from 'material-ui/svg-icons/maps/navigation';
import ContentAdd from 'material-ui/svg-icons/content/add';

// import the react Components
import EventList from './event_list';
import MapContainer from './map_container';
import AddEventDialog from './add_event_dialog';
import FilterContainer from './filter_container';
import LocationDialog from './location_dialog';

// import the redux actions
import { unfetchEvent, fetchEvents, getLocation, clearBalloons, setMapCenter, getLoginStatusFromFb } from '../actions';

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
      mapHeight: (window.innerHeight - 100).toString().concat('px'),
      mapWidth: (window.innerWidth).toString().concat('px'),
      showBtns: false,
      refocus: false,
    };
  }

  componentWillMount() {
    if (this.props.latitude === 'retry' && this.props.longitude === 'retry') {
      this.props.getLocation();
    }
    if (this.props.currentEvent) {
      this.props.unfetchEvent();
    }
  }

  componentDidMount() {
    this.getEvents();
    // Listener that resizes the map, if the user changes the window dimensions.
    window.addEventListener('resize', this.onResize);
  }

  componentWillUpdate(nextProps, nextState) {
    if ((!nextProps.eventList) || (nextProps.eventList[0] === 'retry')) {
      if (nextProps.latitude && nextProps.longitude) {
        this.getEvents();
      }
    }
    if (nextProps.latitude !== this.props.latitude || nextProps.longitude !== this.props.longitude) {
      this.props.fetchEvents(nextProps.latitude, nextProps.longitude, RADIUS);
    }
    if (nextProps.currentEvent) {
      this.props.unfetchEvent();
      // this.forceUpdate();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.setState({ mapHeight: (window.innerHeight - 100).toString().concat('px') });
    this.setState({ mapWidth: (window.innerWidth).toString().concat('px') });
  }

  getEvents = () => {
    this.props.fetchEvents(this.props.latitude, this.props.longitude, RADIUS);
  }

  closeAddEventDialog = () => {
    this.setState({ addEvent: false });
  }

  handleAddEventData = (data) => {
    this.setState({ addEvent: false }, this.getEvents);
    this.props.getLoginStatusFromFb(this.props.user.jwt);
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
    this.setState({ isRefocus: true });
    this.setState({ showBtns: false });
    this.forceUpdate();
  }

  doneRefocus = () => {
    this.setState({ isRefocus: false });
  }

  render() {
    let SettingsButton;
    if (this.state.showBtns) {
      SettingsButton = (
        <div>
          <IconButton className="refocusButton" style={{ position: 'absolute', marginRight: '15px' }}
            onClick={this.refocusLocation} tooltipPosition="bottom-center" tooltip="Refocus Map"
          >
            <MapsMyLocation />
          </IconButton>
          <IconButton className="zipcodeButton" style={{ position: 'absolute', marginRight: '30px' }}
            onClick={this.toggleGeolocation} tooltipPosition="bottom-center" tooltip="Change Location"
          >
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
      <div className="home-container">
        <FilterContainer />
        <div className="main-container" style={{ height: this.state.mapHeight }}>
          <EventList
            selectedLocation={this.state.selectedLocation}
            toggleGeolocation={this.toggleGeolocation}
          />
          <div className="mapAndButton">
            <MapContainer
              height={this.state.mapHeight}
              width={this.state.mapWidth}
              centerLocation={{ lat: this.props.latitude, lng: this.props.longitude }}
              isRefocus={this.state.isRefocus}
              doneRefocus={this.doneRefocus}
            />
            <IconButton className="geoButton" style={{ position: 'absolute' }} onClick={this.toggleSettings}>
              <ActionSettings />
            </IconButton>
            {SettingsButton}
            <div className="add-event-btn-container">
              <FloatingActionButton
                disabled={!this.props.isUserLoggedIn}
                onClick={this.toggleAddEvent}
              >
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>
        </div>
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
    mapCenter: state.map.center,
    isUserLoggedIn: state.user.loggedIn,
    currentEvent: state.events.currentEvent,
  }
);

const mapDispatchToProps = { unfetchEvent, fetchEvents, getLocation, clearBalloons, setMapCenter, getLoginStatusFromFb };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
