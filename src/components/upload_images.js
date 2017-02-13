// add_event_dialog.js
// TODO: add validations to the slider so that you cannot go forward

import React, { Component } from 'react';
import { getSignedImageURL } from '../helpers/dartmap-api';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      image_url: null,
    };
    this.getSignedRequest = this.getSignedRequest.bind(this);
    this.initUpload = this.initUpload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  getSignedRequest(file) {
    getSignedImageURL(file).then((response) => {
      console.log('YAY, got signed request from the backend.');
      const resp = JSON.parse(response);
      console.log(resp);
      this.uploadFile(file, resp.data, resp.url);
    });
  }

  uploadFile(file, s3Data, url) {
    console.log(s3Data.url);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', s3Data.url);
    xhr.setRequestHeader('x-amz-acl', 'public-read');

    const postData = new FormData();
    let key;
    for (key in s3Data.fields) {
      if (key) {
        postData.append(key, s3Data.fields[key]);
      }
    }
    postData.append('file', file);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 204) {
          document.getElementById('preview').src = url;
          this.props.updateImageURL(url);
        } else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(postData);
  }

  initUpload() {
    const files = document.getElementById('file-input').files;
    const file = files[0];
    if (!file) {
      alert('No file selected.');
    }
    console.log(file);
    this.getSignedRequest(file);
  }
  handleClose() {
    this.resetState();
    this.props.closeAddEventDialog();
  }
  render() {
    return (
      <div className="image-select">
        <input type="file" id="file-input" onChange={this.initUpload} />
        <img className="selected-image" role="presentation" id="preview" src="../../images/default.png" />
      </div>
    );
  }
}

export default ImageUpload;
