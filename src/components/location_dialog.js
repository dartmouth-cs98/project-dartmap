import React, { Component } from 'react';
import ReactModal from 'react-modal';

class LocationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleDialogData = this.handleDialogData.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.submitModalData = this.submitModalData.bind(this);
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
      latitude: null,
      longitude: null,
    };
    this.props.submitModalData(data);
    this.handleCloseModal();
  }

  render() {
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
// export { handleOpenModal };
