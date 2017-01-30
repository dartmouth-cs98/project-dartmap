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
    this.props.handleOpenLocationDialog(error);
  }

  render() {
    return (
      <div className="hidden" />
    );
  }
}
export default Geolocation;
