// geolocation.js
import React from 'react';

class Geolocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
    };
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoError = this.geoError.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getLocation();
  }

  getLocation() {
    if ('geolocation' in navigator) {
      console.log('YAY!!!');
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    } else {
      // console.log('NONONONONOONONO!!!');
    }
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
    this.props.handleOpenLocationDialog(error);
  }

  // convertZipToLatLong = function convertZipToLatLong(zipcode) {
  //   // Add zipcode to lat long function here.

  //   const location = {
  //     latitude: 43.7022,
  //     longitude: 72.2896,
  //   };
  //   console.log(zipcode);
  //   return location;
  // }


  render() {
    return (
      <div className="hidden" />
    );
  }
}
export default Geolocation;
