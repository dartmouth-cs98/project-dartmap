// add_event_dialog.js
// TODO: add validations to the slider so that you cannot go forward

import React, { Component } from 'react';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      organizer: null,
      description: null,
      date: null,
      start_time: null,
      end_time: null,
      location: null,
      location_string: null,
      categories: null,
      icon: null,
      currentPage: 0,
    };
    this.handlePageData = this.handlePageData.bind(this);
    this.submitEventData = this.submitEventData.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.getSignedRequest = this.getSignedRequest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initUpload = this.initUpload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  resetState() {
    this.setState({
      name: null,
      organizer: null,
      description: null,
      date: null,
      start_time: null,
      end_time: null,
      location: null,
      location_string: null,
      categories: [],
      icon: null,
      currentPage: 0,
    });
  }
  handlePageData(data) {
    this.setState(data);
  }
  submitEventData() {
    const data = {
      name: this.state.name,
      organizer: this.state.organizer,
      description: this.state.description,
      date: this.state.date,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      location: this.state.location,
      location_string: this.state.location_string,
      icon_url: this.state.icon.url,
      categories: this.state.categories,
    };
    this.resetState();
    this.props.handleAddEventData(data);
  }

  handleSubmit() {

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
        } else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(postData);
  }

  getSignedRequest(file) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign_s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log('YAY, got signed request from the backend.');
          this.uploadFile(file, response.data, response.url);
        } else {
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
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
      <div>
        <input type="file" id="file-input" onChange={this.initUpload} />
        <p id="status">Please select a file</p>
        <img role="presentation" id="preview" src="../../images/default.png" />

        <form className="add-event-form" onSubmit={this.handleSubmit}>
          <input type="hidden" id="avatar-url" name="avatar-url" value="../../images/default.png" />
          <input type="submit" value="Upload image" />
        </form>
      </div>
    );
  }
}

export default ImageUpload;
