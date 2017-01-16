// geolocation.js
import React from 'react';
import EventList from './event_list';

class Geolocation extends React.Component {
  constructor(props) {
    super(props);
    this.coords = null;
    this.state = {
      latitude: null,
      longitude: null,
    };
  }
  render() {
    // const coords = null;
    function geoSuccess(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;


      console.log(position);
      document.getElementById('startLat').innerHTML = position.coords.latitude;
      document.getElementById('startLon').innerHTML = position.coords.longitude;



      // this.setState({
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude,
      // });
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
