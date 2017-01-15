import React, { Component } from 'react';


/**
 * This Class includes all the functions that draw the popup balloons in the window.
 */
export default class EventsWithControllableHover extends Component {

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.offsetX = 0;
    this.offsetY = 30;
  }

  createPopupHtml() {
    return `<img src=${this.props.icon_url} height="20" width="20">
    <br /><b>${this.props.name} @ ${this.props.start_time.format('h:mm A')}</b>
    <br />${this.props.description}<br />Organizer: ${this.props.organizer}`;
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
    popupDiv.innerHTML = this.createPopupHtml();
  }

  createStickyPopup(id) {
    const parent = document.getElementsByTagName('body')[0];
    const popupsToRemove = document.getElementsByClassName('popup');
    while (popupsToRemove.length > 0) {
      parent.removeChild(popupsToRemove[popupsToRemove.length - 1]);
    }
    setTimeout(() => {
      const eventNode = document.getElementById(id);
      const rect = eventNode.getBoundingClientRect();
      const popupDiv = document.createElement('div');
      popupDiv.className = 'popup stickyPopup'.concat(this.props.id);
      document.getElementsByTagName('body')[0].appendChild(popupDiv);
      popupDiv.style.position = 'absolute';
      popupDiv.style.left = (rect.left + this.offsetX).toString().concat('px');
      popupDiv.style.top = (rect.top + this.offsetY).toString().concat('px');
      popupDiv.innerHTML = this.createPopupHtml();

      const closeButtonDiv = document.createElement('div');
      closeButtonDiv.className = 'close-button';
      closeButtonDiv.innerHTML = 'x';
      closeButtonDiv.addEventListener('click', (event) => {
        const stickyPopupsToRemove = document.getElementsByClassName('stickyPopup'.concat(id));
        while (stickyPopupsToRemove.length > 0) {
          parent.removeChild(stickyPopupsToRemove[stickyPopupsToRemove.length - 1]);
        }
      });
      popupDiv.appendChild(closeButtonDiv);
    }, 100);
  }

  render() {
    if (this.props.showStickyBalloonId === this.props.id) {
      this.createStickyPopup(this.props.id);
    }
    if (this.props.showBalloonId) {
      this.createHoverPopup();
    } else {
      const parent = document.getElementsByTagName('body')[0];
      const popups = document.getElementsByClassName('popup'.concat(this.props.id));
      while (popups.length > 0) {
        parent.removeChild(popups[popups.length - 1]);
      }
    }

    const currentClass = this.props.showBalloonId ? 'event-hover' : 'event';
    return (
      <button type="button" onClick={() => this.createStickyPopup(this.props.id)} id={this.props.id} className={currentClass}>
        <div>{this.props.text}</div>
      </button>
    );
  }
}
