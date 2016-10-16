// map_container.js
import React from 'react';
import GoogleMap from 'google-map-react';

const MapContainer = (props) => {
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
          defaultCenter={{lat: 43.703337, lng: -72.288578}}
          defaultZoom={16}>
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
