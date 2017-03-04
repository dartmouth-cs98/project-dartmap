/*
  Filters by time
  Options range from 8am-2am
  Granular in 2-hour increments
*/

import React, { Component } from 'react';
import Rcslider from 'rc-slider';
import { connect } from 'react-redux';
import Select from 'react-select';

import { Popover, Slider, RaisedButton } from 'material-ui';

// const TIMES_DATA = {0: 8, 1: 10, 2: 12, 3: 14, 4: 16, 5: 18, 6: 20, 7: 22, 8: 0, 9: 2};
const TIMES_DATA_DISPLAY = { 
	0: '8am', 
	1: '10am', 
	2: 'noon', 
	3: '2pm', 
	4: '4pm', 
	5: '6pm', 
	6: '8pm', 
	7: '10pm', 
	8: 'midnight', 
	9: '2am' 
};

class TimeFilter extends Component {

	constructor(props) {
    super(props);

    this.state = {
      value: [0, 9],
    }
	}

  	handleChange = (value) => {
  		this.setState({ value });
      console.log(value);
  	}

  	render() {
  		if (!this.props.openTimeFilter) {
      return (
        <form>
      <div className="multiselect">
        <RaisedButton className="block"
        onTouchTap={this.props.openFilter}
        label="Filter by Time"
        />
      </div>
    </form>
        );
    }

  	return (
  		 <form>
      <div className="multiselect">
        <RaisedButton className="block"
        onTouchTap={this.props.openFilter}
        label="Filter by Time"
        />
        </div>

          <Popover className="slider-container"
            open={this.props.openTimeFilter}
            anchorEl={this.props.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.props.openFilter}
          >
          <div className="slider">
	      	<Rcslider 
          tipFormatter={null} marks={TIMES_DATA_DISPLAY} 
	      	min={0} max={9} allowCross={false} range dots step={1} 
	      	defaultValue={[0, 9]} value={this.state.value}
	      	onChange={this.handleChange} 
	      	onAfterChange={this.onTimeChange} />
          </div>
      </Popover>
    </form>
        );

	};
};

export default TimeFilter;
