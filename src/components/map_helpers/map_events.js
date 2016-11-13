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
    this.offsetY = 50;
  }

  createPopupHtml() {
    return '<b>' + this.props.name + '</b><br />' + this.props.description;
    // return '<b>' + this.props.name + '</b><br />' + this.props.location_string + '<br />' + this.props.description;
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
      closeButtonDiv.addEventListener('click', function(event) {
        const stickyPopupsToRemove = document.getElementsByClassName('stickyPopup'.concat(id));
        while (stickyPopupsToRemove.length > 0) {
          parent.removeChild(stickyPopupsToRemove[stickyPopupsToRemove.length - 1]);
        }
      });
      popupDiv.appendChild(closeButtonDiv);
    }, 100);
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
