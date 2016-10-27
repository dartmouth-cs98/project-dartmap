import React, { Component } from 'react';
// import React, { PropTypes, Component } from 'react';

export default class EventsWithControllableHover extends Component {
  // static propTypes = {
  //   // use hover from controllable
  //   hover: PropTypes.bool,
  //   text: PropTypes.string,
  // };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.offsetX = 0;
    this.offsetY = 70;
  }

  createHoverPopup() {
    const eventNode = document.getElementById(this.props.id);
    const rect = eventNode.getBoundingClientRect();
    const popupDiv = document.createElement('div');
    popupDiv.className = 'popup popup'.concat(this.props.id);
    document.getElementsByTagName('body')[0].appendChild(popupDiv);
    popupDiv.style.position = 'absolute';
    popupDiv.style.left = (rect.left + this.offsetX).toString().concat('px');
    popupDiv.style.top = (rect.top + this.offsetY).toString().concat('px');
    popupDiv.innerHTML = this.props.description;
  }

  createStickyPopup(id) {
    const eventNode = document.getElementById(id);
    const rect = eventNode.getBoundingClientRect();
    const popupDiv = document.createElement('div');
    popupDiv.className = 'popup';
    document.getElementsByTagName('body')[0].appendChild(popupDiv);
    popupDiv.style.position = 'absolute';
    popupDiv.style.left = (rect.left + this.offsetX).toString().concat('px');
    popupDiv.style.top = (rect.top + this.offsetY).toString().concat('px');
    popupDiv.innerHTML = this.props.description;
  }

  render() {
    if (this.props.showStickyBalloon === this.props.id) {
      this.createStickyPopup(this.props.id);
    }
    if (this.props.showBalloon) {
      this.createHoverPopup();
    } else {
      const parent = document.getElementsByTagName('body')[0];
      const popups = document.getElementsByClassName('popup'.concat(this.props.id));
      while (popups.length > 0) {
        parent.removeChild(popups[popups.length - 1]);
      }
    }

    const currentClass = this.props.showBalloon ? 'event-hover' : 'event';
    return (
      <button type="button" onClick={() => this.createStickyPopup(this.props.id)} id={this.props.id} className={currentClass}>
        <div>{this.props.text}</div>
      </button>
    );
  }
}
