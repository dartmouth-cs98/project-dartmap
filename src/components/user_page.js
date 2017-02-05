// user_page.js

import React, { Component } from 'react';

import ChangePhotoDialog from './change_photo_dialog';

class UserPage extends Component {

  // constructor(props) {
  //   super(props);
  // }
  // state = { changingPhoto: false };

  // openChangePhotoDialog() {
  //   this.setState({ changingPhoto: true });
  // };

  constructor(props) {
    super(props);
    this.state = {
      changingPhoto: false,
    };
    this.openChangePhotoDialog = this.openChangePhotoDialog.bind(this);
    this.closeChangePhotoDialog = this.closeChangePhotoDialog.bind(this);
  }

  openChangePhotoDialog() {
    console.log('CLICKED BUTTON');
    this.setState({ changingPhoto: true });
  }

  closeChangePhotoDialog() {
    this.setState({ changingPhoto: false });
  }

  render() {
    return (
      <div className="profile">
        <div className="photo-container">
          <img className="photo" src="https://s27.postimg.org/ws3spwi9f/unknown.png" alt="You" />
          <div className="change-photo">
            <button className="change-photo-button" type="button" onClick={this.openChangePhotoDialog}>
            Change Photo
            </button>
          </div>
        </div>
        <h1>Hi, Edrei!</h1>
        <br />
        <h2>Name: Edrei Chua</h2>
        <ChangePhotoDialog
          changingPhoto={this.state.changingPhoto}
          closeChangePhotoDialog={this.closeChangePhotoDialog}
        />
      </div>
    );
  }
}

export default UserPage;


// <button className="add-event-plus" type="button" onClick={this.props.toggleAddEvent}>
//   Add Event
//   <img id="plus" src="./../../icon_set_1/plus.png" role="presentation" />
// </button>
