// map_container.js
import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import controllable from 'react-controllables';
import EventsWithControllableHover from './map_helpers/map_events.js';

import {K_SIZE} from './map_helpers/map_styles.js';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class MapContainer extends Component {
  static propTypes = {
    center: PropTypes.array, // @controllable
    zoom: PropTypes.number, // @controllable
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn

    events: PropTypes.array
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
    var parent = document.getElementsByTagName('body')[0];
    var popups = document.getElementsByClassName("popup");
    while (popups.length > 0) {
      parent.removeChild(popups[popups.length - 1]);
    }
  }

  _onChildClick = (key, childProps) => {
    // this.props.onCenterChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter = (key /*, childProps */) => {
    this.props.onHoverKeyChange(key);
  }

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  }

  render() {
    const mapEvents = this.props.events
      .map(mapEvent => {
        const {id, ...coords} = mapEvent;
        return (
          <EventsWithControllableHover
            {...coords}
            key={id}
            id={id}
            text={String(id)}
            // use your hover state (from store, react-controllables etc...)
            showStickyBalloon={this.props.showStickyBalloonEventId}
            showBalloon={this.props.showBalloonEventId === id || this.props.hoverKey === id} />
        );
      });
    var mapStyle = {
      height: .6 * screen.height + 'px',
      width: .6 * screen.width + 'px',
    };
    return (
      <div id="map" style={mapStyle}>
        <GoogleMap
            bootstrapURLKeys={{
              key: "AIzaSyAmi90D8Iw5A51foVbt3m87kmuN7FSN_ek",
            }}
            center={this.props.center}
            zoom={this.props.zoom}
            hoverDistance={K_SIZE / 2}
            onBoundsChange={this._onBoundsChange}
            onChildClick={this._onChildClick}
            onChildMouseEnter={this._onChildMouseEnter}
            onChildMouseLeave={this._onChildMouseLeave}>
          {mapEvents}
        </GoogleMap>
      </div>
    );
  }
};
