import React, { Component } from 'react';
import ReactModal from 'react-modal';

class LocationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      data: {
        latitude: null,
        longitude: null,
      },
      zipcode: '',
    };

    this.gMaps = (window.google && window.google.maps);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleDialogData = this.handleDialogData.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.submitModalData = this.submitModalData.bind(this);
    this.handlePopup = this.handlePopup.bind(this);
    this.handleGeocoderResponse = this.handleGeocoderResponse.bind(this);
  }

  handleDialogData = (e) => {
    this.setState({ zipcode: e.target.value });
  }

  handleOpenModal() {
    this.setState({
      showModal: true,
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
    });
  }

  handleGeocoderResponse(results, status) {
    if (status === this.gMaps.GeocoderStatus.OK) {
      this.setState({ data: {
        latitude: results[0].geometry.location.lat(),
        longitude: results[0].geometry.location.lng(),
      } });
      if (results[0].geometry.location.lat() && results[0].geometry.location.lng()) {
        const data = {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        };
        this.props.submitModalData(data);
        this.handleCloseModal();
      }
    } else {
      console.error('Geocode was not successful for the following reason: '.concat(status));
    }
  }

  submitModalData() {
    const address = this.state.zipcode;
    this.geocoder = new this.gMaps.Geocoder();

    this.geocoder.geocode({ address }, this.handleGeocoderResponse);
  }

  handlePopup() {
    console.log('hello');
    console.log(this.state.longitude);
    const data = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    this.props.submitModalData(data);
    this.handleCloseModal();
  }

  render() {
    console.log('hi');
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Location Dialog"
          className="Modal"
        >
          Please insert your current zipcode. <br />
          <input type="text" value={this.state.zipcode} onChange={this.handleDialogData} placeholder="Type here..." />
          <button onClick={this.submitModalData}>Submit</button> <br />
          <div id="close-button" onClick={this.handleCloseModal}>x</div>
        </ReactModal>
      </div>
    );
  }
}

export default LocationDialog;

