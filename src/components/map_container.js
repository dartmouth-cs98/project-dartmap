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
    // clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn

    events: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    center: [43.703337, -72.288578],
    zoom: 15,
  };

  constructor(props) {
    super(props);
    this.events = props.events;
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
    // this.props.onCenterChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter = (key /* , childProps */) => {
    this.props.onHoverKeyChange(key);
  }

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  }

  render() {
    const mapEvents = this.props.events
      .map((mapEvent) => {
        const { id, ...coords } = mapEvent;
        return (
          <EventsWithControllableHover
            {...coords}
            key={id}
            id={id}
            text={String(id)}
            // use your hover state (from store, react-controllables etc...)
            showStickyBalloon={this.props.showStickyBalloonEventId}
            showBalloon={this.props.showBalloonEventId === id || this.props.hoverKey === id}
          />
        );
      });
    const mapStyle = {
      height: (0.6 * window.innerHeight).toString().concat('px'),
      width: (0.8 * window.innerWidth).toString().concat('px'),
    };
    return (
      <div id="map" style={mapStyle}>
        <GoogleMap
          bootstrapURLKeys={{
            key: 'AIzaSyAmi90D8Iw5A51foVbt3m87kmuN7FSN_ek',
          }}
          center={this.props.center}
          zoom={this.props.zoom}
          hoverDistance={K_SIZE / 2}
          onBoundsChange={this._onBoundsChange}
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
