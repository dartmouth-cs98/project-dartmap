/*
  Filters by time
  Options range from 8am-2am
  Granular in 2-hour increments
*/

import React, { Component } from 'react';
import Rcslider from 'rc-slider';
import { connect } from 'react-redux';

// const TIMES_DATA = {0: 8, 1: 10, 2: 12, 3: 14, 4: 16, 5: 18, 6: 20, 7: 22, 8: 0, 9: 2};
const TIMES_DATA_DISPLAY = { 0: '8am', 1: '10am', 2: 'noon', 3: '2pm', 4: '4pm', 5: '6pm', 6: '8pm', 7: '10pm', 8: 'midnight', 9: '2am' };

// function log(value) {
//   console.log(value);
// }

class TimeFilter extends Component {

	constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    }

    this.showSlider = this.showSlider.bind(this);
    this.onTimeChange = props.onTimeChange;
	}

	showSlider() {
    var slider = document.getElementById("slider");
    if (!this.state.expanded) {
      this.setState({ expanded : true });
    } else {
      this.setState({ expanded : false });
    }
  	}

  	render() {
  		if (!this.state.expanded) {
      return (
        <form>
      <div className="multiselect">
        <div className="selectBox" onClick={this.showSlider}>
          <select>
            <option>Filter by Time </option>
          </select>
          <div className="overSelect"></div>
        </div>
      </div>
    </form>
        );
    }

  	return (
  		<form>
      <div className="multiselect">
        <div className="selectBox" onClick={this.showSlider}>
          <select>
            <option>Filter by Time </option>
          </select>
          <div className="overSelect"></div>

	          <div className="time-filter">
	      	<Rcslider tipFormatter={null} marks={TIMES_DATA_DISPLAY} 
	      	min={0} max={9} allowCross={false} range dots step={1} 
	      	defaultValue={[0, 9]} onAfterChange={this.onTimeChange} />
   			 </div>
        </div>
      </div>
    </form>
        );

	};
};

export default TimeFilter;
