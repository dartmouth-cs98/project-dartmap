// add_event_dialog.js
// TODO: add validations to the slider so that you cannot go forward

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class UploadPhotoDialog extends Component {
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
    this.props.closeUploadPhotoDialog();
  }

  render() {
    if (this.props.uploadingPhoto) {
      return (
        <div className="upload-image-cover">
          <div id="upload-image">
            <div className="upload-image-top">
              <div>
                <h1>Upload an image</h1>
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

export default UploadPhotoDialog;
