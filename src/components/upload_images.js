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
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.initUpload = this.initUpload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  getSignedRequest(file) {
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', '/sign_s3');
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //       const response = JSON.parse(xhr.responseText);
    //       console.log('YAY, got signed request from the backend.');
    //       this.uploadFile(file, response.data, response.url);
    //     } else {
    //       alert('Could not get signed URL.');
    //     }
    //   }
    // };
    // xhr.send();

    getSignedImageURL(file).then((response) => {
      console.log('YAY, got signed request from the backend.');
      console.log(response.data);
      console.log(response.url);
      // this.setState({
      //   image_url: response.url,
      // });
      this.uploadFile(file, response.data, response.url);
    });
  }

  uploadFile(file, s3Data, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', s3Data.url);
    xhr.setRequestHeader('x-amz-acl', 'public-read');

    const postData = new FormData();
    for (const key in s3Data.fields) {
      postData.append(key, s3Data.fields[key]);
    }
    postData.append('file', file);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 204) {
          document.getElementById('preview').src = url;
          document.getElementById('avatar-url').value = url;
          const response = JSON.parse(xhr.responseText);
          this.props.updateImageURL(response.location);
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
