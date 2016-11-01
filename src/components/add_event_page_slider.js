/*
  Filters by page within the "add event" dialog
*/

import React, { Component } from 'react';
import Rcslider from 'rc-slider';

// function log(value) {
//   console.log(value);
// }

class PageSlider extends Component {

  constructor(props) {
    super(props);
    this.didChange = props.didChange;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const val = event;
    this.props.handlePageChange(val);
  }

  render() {
    if (this.props.didChange) {
      return (
        <div className="page-slider">
          <Rcslider tipFormatter={null} min={0} max={3} dots step={1} value={this.props.currentPage} defaultValue={0} onBeforeChange={this.handleChange} />
        </div>
      );
    } else {
      return (
        <div className="page-slider">
          <Rcslider tipFormatter={null} min={0} max={3} dots step={1} defaultValue={0} onAfterChange={this.handleChange} />
        </div>
      );
    }
  }
}

export default PageSlider;
