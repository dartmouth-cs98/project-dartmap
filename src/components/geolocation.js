// geolocation.js
import React from 'react';

class Geolocation extends React.Component {
  constructor(props) {
    super(props);
    this.coords = null;
    this.state = {
      latitude: null,
      longitude: null,
    };
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoError = this.geoError.bind(this);
  }

  geoSuccess(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    this.props.getLocation(this.state.latitude, this.state.longitude);
  }

  geoError(error) {
    // switch (error.code) {
    //   case error.PERMISSION_DENIED:
    //     alert('User denied the request for Geolocation.');
    //     break;
    //   case error.POSITION_UNAVAILABLE:
    //     alert('Location information is unavailable.');
    //     break;
    //   case error.TIMEOUT:
    //     alert('The request to get user location timed out.');
    //     break;
    //   default:
    //     alert('An unknown error occurred.');
    //     break;
    // }
    this.props.handleOpenModal();
  }

  render() {
    if ('geolocation' in navigator) {
      // console.log('YAYAYAYAYAYA!!!');
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    } else {
      // console.log('NONONONONOONONO!!!');
    }
    return (
      <div className="hidden">
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
