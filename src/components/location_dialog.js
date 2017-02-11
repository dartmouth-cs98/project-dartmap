import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';

import { getZipcodeLocation } from '../actions';

class LocationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
    };
    this.submitModalData = this.submitModalData.bind(this);
  }

  submitModalData() {
    this.props.getZipcodeLocation(this.state.zipcode);
  }

  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div>
        <ReactModal
          isOpen={this.props.showModal}
          contentLabel="Location Dialog"
          className="Modal"
        >
          Please insert your current zipcode. <br />
          <input
            type="text"
            value={this.state.zipcode}
            onChange={e => this.setState({ zipcode: e.target.value })}
            placeholder="Type here..."
          />
          <button onClick={this.submitModalData}>Submit</button>
        </ReactModal>
      </div>
    );
  }
}

export default connect(null, { getZipcodeLocation })(LocationDialog);
