// event_page.js
import React, { Component } from 'react';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.hi = '';
  }
  render() {
    return (
      <div>
        <div>This will be the event page for event</div>
        <div>{this.props.params.id}</div>
      </div>
    );
  }
}

export default EventPage;
