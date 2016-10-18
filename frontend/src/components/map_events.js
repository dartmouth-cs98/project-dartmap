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

  render() {
    const style = this.props.hover ? eventStyleHover : eventStyle;

    return (
       <div style={style}>
          <div>{this.props.text}</div>
       </div>
    );
  }
}