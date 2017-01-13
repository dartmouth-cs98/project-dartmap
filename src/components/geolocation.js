// geolocation.js
import React from 'react';


class Geolocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.coords = null;
  }
  render() {
    function geoSuccess(position) {
      console.log(position);
      document.getElementById('startLat').innerHTML = position.coords.latitude;
      document.getElementById('startLon').innerHTML = position.coords.longitude;
    }
    function geoError() {
      console.log('Sorry, position is not available.');
    }

    if ('geolocation' in navigator) {
      console.log('YAYAYAYAYAYA!!!');
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
      console.log('NONONONONOONONO!!!');
    }
    return (
      <div>
        <p id="startLat">
          Some text here
        </p>
        <p id="startLon">
          Some text here
        </p>
      </div>
    );
  }
}
export default Geolocation;
