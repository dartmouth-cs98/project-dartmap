// map_container.js
import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import controllable from 'react-controllables';
import EventsWithControllableHover from './map_helpers/map_events';

const K_SIZE = 40;

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class MapContainer extends Component {
  static propTypes = {
    center: PropTypes.arrayOf(PropTypes.number), // @controllable
    zoom: PropTypes.number, // @controllable
    hoverKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn

    events: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    zoom: 15, // The level in which Google Maps should zoom into. Higher is more zoomed in.
  };

  constructor(props) {
    super(props);
    this.createLocationsFromEvents = this.createLocationsFromEvents.bind(this);
    const locations = this.createLocationsFromEvents(props.events);
    this.state = {
      locations,
    };
  }

  componentWillReceiveProps(newProps) {
    // newProps.events is a pre-filtered list of events to display on the map.
    if (newProps.events && newProps.events.length > 0) {
      const locations = this.createLocationsFromEvents(newProps.events);
      this.setState({ locations });
    }
  }

  _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
    this.props.onCenterChange(center);
    this.props.onZoomChange(zoom);
    const parent = document.getElementsByTagName('body')[0];
    const popups = document.getElementsByClassName('popup');
    while (popups.length > 0) {
      parent.removeChild(popups[popups.length - 1]);
    }
  }

  _onChildClick = (key, childProps) => {
    // Recenter the map to the event that is clicked on.
    // this.props.onCenterChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter = (key /* , childProps */) => {
    this.props.onHoverKeyChange(key);
  }

  createLocationsFromEvents(eventList) {
    // Temporary hack to fix a lint error.
    const temp = this.locations;
    console.log(temp);

    const locations = new Map();
    for (let i = 0; i < eventList.length; i += 1) {
      if (locations.has(eventList[i].location_id)) {
        locations.get(eventList[i].location_id).push(eventList[i]);
      } else {
        locations.set(eventList[i].location_id, [eventList[i]]);
      }
    }
    return locations;
  }

  maybeSelectLocation = (event) => {
    if (this.props.handleSelectedLocation) {
      const selectedLocation = {
        id: 'x',
        name: 'New Event 1',
        location: 1,
        lat: event.lat,
        lng: event.lng,
        description: 'Location of new event',
      };
      this.props.handleSelectedLocation({ location_obj: [selectedLocation] });
      const locations = this.createLocationsFromEvents([selectedLocation]);
      this.setState({ locations });
    }
  }

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  }

  render() {
    const mapEvents = [];
    if (this.state.locations.size > 0) {
      this.state.locations.forEach((location) => {
        const { id, ...coords } = location[0];
        // EventsWithControllableHover is defined in map_helpers/map_events.js
        // The actual frontend code that displays the balloons is in map_events.js
        // This is the information that is passed to EventsWithControllableHover.
        mapEvents.push(<EventsWithControllableHover
          {...coords}
          key={id}
          id={id}
          // text={String(id)}
          // use your hover state (from store, react-controllables etc...)
          showStickyBalloonId={this.props.showStickyBalloonEventId}
          showBalloonId={this.props.showBalloonEventId === id
              || parseInt(this.props.hoverKey, 10) === id}
          eventsForLocation={location}
        />);
      });
    }
    const mapStyle = {
      height: this.props.height,
      width: this.props.width,
    };
    return (
      <div id="map" style={mapStyle}>
        <GoogleMap
          bootstrapURLKeys={{
            key: process.env.GOOGLE_API_KEY,
            libraries: 'places',
          }}
          center={this.props.center}
          zoom={this.props.zoom}
          hoverDistance={K_SIZE / 2}
          onBoundsChange={this._onBoundsChange}
          onClick={this.maybeSelectLocation}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
        >
          {mapEvents}
        </GoogleMap>
      </div>
    );
  }
}

// key: 'AIzaSyAmi90D8Iw5A51foVbt3m87kmuN7FSN_ek',
