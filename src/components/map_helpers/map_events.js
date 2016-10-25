import React, {PropTypes, Component} from 'react';

import {eventStyle, eventStyleHover} from './map_styles.js';

export default class EventsWithControllableHover extends Component {
  static propTypes = {
    // use hover from controllable
    hover: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  createHoverPopup() {
    var eventNode = document.getElementById(this.props.id);
    var rect = eventNode.getBoundingClientRect();
    var offsetX = 0;
    var offsetY = 50;
    var popupDiv = document.createElement('div');
    popupDiv.className = 'popup popup' + this.props.id;
    document.getElementsByTagName('body')[0].appendChild(popupDiv);
    popupDiv.style.position = 'absolute';
    popupDiv.style.left = (rect.left + offsetX) + 'px';
    popupDiv.style.top = (rect.top + offsetY) + 'px';
    popupDiv.innerHTML = this.props.description;
  }

  createStickyPopup(id) {
    var eventNode = document.getElementById(id);
    var rect = eventNode.getBoundingClientRect();
    var offsetX = 0;
    var offsetY = 50;
    var popupDiv = document.createElement('div');
    popupDiv.className = 'popup';
    document.getElementsByTagName('body')[0].appendChild(popupDiv);
    popupDiv.style.position = 'absolute';
    popupDiv.style.left = (rect.left + offsetX) + 'px';
    popupDiv.style.top = (rect.top + offsetY) + 'px';
    popupDiv.innerHTML = this.props.description;
  }

  render() {
    if (this.props.showStickyBalloon == this.props.id) {
      this.createStickyPopup(this.props.id);
    }
    if (this.props.showBalloon) {
      this.createHoverPopup();
    } else {
      var parent = document.getElementsByTagName('body')[0];
      var popups = document.getElementsByClassName('popup' + this.props.id);
      while (popups.length > 0) {
        parent.removeChild(popups[popups.length - 1]);
      }
    }

    const style = this.props.showBalloon ? eventStyleHover : eventStyle;
    return (
       <div onClick={() => this.createStickyPopup(this.props.id)} id={this.props.id} style={style}>
          <div>{this.props.text}</div>
       </div>
    );
  }
}
