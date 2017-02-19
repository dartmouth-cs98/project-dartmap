// add_event_dialog.js
// TODO: add validations to the slider so that you cannot go forward

import React, { Component } from 'react';
import { getSignedImageURL } from '../helpers/dartmap-api';
import Dropzone from 'react-dropzone';

class UploadPhotoDialog extends Component {
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

  getSignedRequest(files) {
    for(let i = 0; i < files.length; i += 1){
      getSignedImageURL(files[i]).then((response) => {
      const resp = JSON.parse(response);
      console.log(resp);
      this.uploadFile(files[i], resp.data, resp.url);
    });
    }
  }

  onDrop(file) {
    let updatedfiles = this.state.files;
    let files = [];
    if(!updatedfiles){
      files = file;
    }else{
      for(let i = 0; i < file.length; i += 1){
        updatedfiles.push(file[i]);
      }
      files = updatedfiles;
    }
    this.setState({
      files: files,
    });
    this.initUpload(file);
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
        } else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(postData);
  }

  initUpload(files) {
    const file = files[0];
    if (!file) {
      alert('No file selected.');
    }
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
              <img className="selected-image" src={file.preview}/>
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
          multiple={true}>
          <div>Drop an image here, or click to select files.</div>
        </Dropzone>
        {this.showFiles()}
      </div>
    );
  }
}

export default UploadPhotoDialog;
