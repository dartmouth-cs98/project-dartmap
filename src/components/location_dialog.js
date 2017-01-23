import React, { Component } from 'react';
import ReactModal from 'react-modal';

class LocationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleDialogData = this.handleDialogData.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.submitModalData = this.submitModalData.bind(this);
    this.handlePopup = this.handlePopup(this);
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

  submitModalData() {
    console.log(this.state.zipcode);
    const data = {
      latitude: -47,
      longitude: -49,
    };
    const address = this.state.zipcode;
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({ 'address': address }, function handle(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        data.latitude = results[0].geometry.location.lat();
        data.longitude = results[0].geometry.location.lng();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }, (() => {
      console.log('hello');
      console.log(this.state.longitude);
      // const data = {
      //   latitude: this.state.latitude,
      //   longitude: this.state.longitude,
      // };
      console.log(data.latitude);
      console.log(data.longitude);
      this.props.submitModalData(data);
      this.handleCloseModal();
    }));

    // this.props.submitModalData(data);
    // this.handleCloseModal();
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
  // function handleOpenModal() {
  //   this.setState({
  //       showModal: true,
  //     });
  // }
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

