import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { getZipcodeLocation } from '../actions';

class LocationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      showModal: false,
    };
    this.submitModalData = this.submitModalData.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  submitModalData() {
    this.props.getZipcodeLocation(this.state.zipcode);
    this.props.handleClose();
  }

  handleOpen() {
    this.setState({
      showModal: true,
    });
  }

  handleClose() {
    this.props.handleClose();
  }

  render() {
    if (!this.props.showModal) {
      return null;
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        onTouchTap={this.submitModalData}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Enter in new zipcode"
          actions={actions}
          modal
          open={this.props.showModal}
        >
          <TextField name="zipcodeInput"
            value={this.state.zipcode}
            onChange={e => this.setState({ zipcode: e.target.value })}
            placeholder="Type here..."
            fullWidth
          />
        </Dialog>
      </div>
    );
  }
}

export default connect(null, { getZipcodeLocation })(LocationDialog);
