/*
  Filters by date
  Based on the upcoming week or next 2 weeks
*/

import React, { Component } from 'react';

import { Popover, Checkbox, RaisedButton } from 'material-ui';

import { convertDatesToDisplay } from '../../helpers/date-data-helper';

// Display today and the next 6 days as filter options
// and an option for the next 2 weeks
const NUM_DAYS_DISPLAY = 8;

// Check all next future events by default
const DEFAULT_CHECKED = [true, true, true, true, true, true, true, true, false];
const DEFAULT_DATES = ['0', '1', '2', '3', '4', '5', '6', '7'];
const UNCHECKED_ALL = [false, false, false, false, false, false, false, false, true];

// Array of dates with labels and values both set
// to the date
const DATES = [];


class DateFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: DEFAULT_DATES,
      checked_boolean: DEFAULT_CHECKED,
    };

     // receives the dates data object passed down from index.js
    this.datesData = this.props.dateBarData;
    if (this.datesData) {
      // dictionary of date strings to be displayed onscreen
      this.datesDataDisplay = convertDatesToDisplay(this.datesData);
    } else {
      this.datesDataDisplay = null;
    }

    for (let i = 0; i < NUM_DAYS_DISPLAY; i += 1) {
      if (this.datesDataDisplay[i] !== undefined) {
        DATES.push(this.datesDataDisplay[i]);
      }
    }
  }

  componentWillMount = () => {
    this.filterEvent(DEFAULT_DATES);
    this.selectedCheckboxes = new Set();
  }

  handleChange = (event) => {
    const val = event.target.value;
    let checked = this.state.checked.slice(); // copy
    let checkedBoolean = this.state.checked_boolean.slice();
    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
      checkedBoolean[val] = false;
      if ((checked.includes('7'))) {
        checked.splice(checked.indexOf('7'), 1);
        checkedBoolean[7] = false;
      }
    } else {
      if (val === '8') {
        checked = [];
        checkedBoolean = UNCHECKED_ALL;
      }
      else if (val === '7') {
        // check every box
        checked = ['0', '1', '2', '3', '4', '5', '6', '7'];
        checkedBoolean = DEFAULT_CHECKED;
      }
      else {
        checkedBoolean[8] = false;
        checked.push(val);
        checkedBoolean[val] = true;  
      }
    }
    this.setState({ checked, checked_boolean: checkedBoolean });
    this.filterEvent(checked);
  }

  filterEvent = (checked) => {
    const dateArray = [];
    // convert checked strings to ints and add them to dateArray (sorted)
    let c, n;
    for (c in checked) {
      if (checked[c]) {
        n = parseInt(checked[c], 10);
        dateArray.push(n);
      }
    }
    dateArray.sort();
    this.props.onDateChange(dateArray);
  }

  render() {
    const buttonType = { primary: true, secondary: false };
    const checkBoxes = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      return (<Checkbox
        label={DATES[i]}
        onCheck={this.handleChange}
        checked={this.state.checked_boolean[i]}
        value={i}
        key={i}
        id={`d${i}`}
      />);
    });
    const uncheck_id = this.state.checked_boolean.length - 1;
    checkBoxes.push(
      <Checkbox
        label="Uncheck all"
        onCheck={this.handleChange}
        checked={this.state.checked_boolean[uncheck_id]}
        value={uncheck_id}
        key={uncheck_id}
        id={`d${uncheck_id}`}
      />);
    let popOver = '';
    if (this.datesDataDisplay && this.props.openDateFilter) {
      buttonType.primary = false;
      buttonType.secondary = true;
      popOver = (<Popover className="checkbox"
        open={this.props.openDateFilter}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={this.props.openFilter}
        style={this.props.styles.checkboxStyle}
      >
        {checkBoxes}
      </Popover>);
    }
    return (
      <div className="filter">
        <div className="multiselect">
          <RaisedButton className="block"
            {...buttonType}
            style={this.props.styles.buttonStyle}
            onTouchTap={this.props.openFilter}
            label="Filter by Date"
          />
        </div>
        {popOver}
      </div>

    );
  }
}

export default DateFilter;
