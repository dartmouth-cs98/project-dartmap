// add_event_dialog.js
// TODO: add validations to the slider so that you cannot go forward

import Dropzone from 'react-dropzone';
import React, { Component } from 'react';
import { getSignedImageURL } from '../helpers/dartmap-api';
// import { Line } from 'rc-progress';

class UploadMultiImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      image_url: null,
      files: null,
    };
    this.getSignedRequest = this.getSignedRequest.bind(this);
    this.initUpload = this.initUpload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(file) {
    let updatedfiles = this.state.files;
    if (!updatedfiles) {
      updatedfiles = file;
    } else {
      for (let i = 0; i < file.length; i += 1) {
        updatedfiles.push(file[i]);
      }
    }
    this.setState({
      files: updatedfiles,
    });
    this.initUpload(file);
  }

  getSignedRequest(files) {
    for (let i = 0; i < files.length; i += 1) {
      getSignedImageURL(files[i]).then((response) => {
        const resp = JSON.parse(response);
        console.log(resp);
        this.uploadFile(files[i], resp.data, resp.url);
      });
    }
  }

  handleClose() {
    this.resetState();
    this.props.closeUploadPhotoDialog();
  }

  uploadFile(file, s3Data, url) {
    console.log(s3Data.url);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', s3Data.url);
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
          this.props.updateImageURL(url);
        }
      }
    };
    xhr.send(postData);
  }

  initUpload(files) {
    console.log(files);
    this.getSignedRequest(files);
  }

  showFiles() {
    const filelist = this.state.files;
    if (!filelist) {
      return null;
    }
    console.log(filelist);

    return (
      filelist.map((file, idx) => {
        return (
          <ul key={idx}>
            <li key={idx}>
              <img className="selected-image" role="presentation" src={file.preview} />
            </li>
          </ul>
        );
      })
    );
  }

  render() {
    return (
      <div className="image-list">
        <Dropzone
          className="image-select"
          onDrop={this.onDrop}
        >
          <div>Drop an image here, or click to select files.</div>
        </Dropzone>
        {this.showFiles()}
      </div>
    );
  }
}

export default UploadMultiImages;
