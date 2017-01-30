// add_event_dialog.js
// TODO: add validations to the slider so that you cannot go forward

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ChangePhotoDialog extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }
  handleClose() {
    this.props.closeChangePhotoDialog();
  }

  render() {
    if (this.props.changingPhoto) {
      return (
        <div className="add-event-cover">
          <div id="add-event">
            <div className="add-event-top">
              <div>
                <h1>Change profile photo</h1>
                <div id="close-button" onClick={this.handleClose}>x</div>
                <Dropzone onDrop={this.onDrop}>
                  <div>Drop an image here, or click to select files.</div>
                </Dropzone>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="hidden">This is the hidden add Event Dialog</div>
    );
  }
}

export default ChangePhotoDialog;
