/*
  Filters by date
  Based on the upcoming week or next 2 weeks
*/

import React, { Component } from 'react';
import { convertDatesToDisplay } from '../helpers/date-data-helper';

// dates that are checked by default
const DEFAULT_DATES = [true, true, false, false, false, false, false, false];

// function log(val) {
//   console.log(val);
// }


class DateFilter extends Component {

  constructor(props) {
    super(props);

    // set which dates (strings) should be checked by default
    const defaultDates = [];
    for (let i = 0; i < DEFAULT_DATES.length; i += 1) {
      if (DEFAULT_DATES[i]) defaultDates.push(i.toString());
    }

    // receives the dates data object passed down from index.js
    const datesData = props.dateBarData;

    // dictionary of date strings to be displayed onscreen
    this.datesDataDisplay = convertDatesToDisplay(datesData);

    this.state = { checked: defaultDates };
    this.handleChange = this.handleChange.bind(this);
    this.onDateChange = props.onDateChange;
  }

  handleChange(event) {
    const val = event.target.value;
    const checked = this.state.checked.slice(); // copy

    // the array of checked dates to send, e.g. [0, 1, 2, 5, 6]
    const dateArray = [];

    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
    } else {
      checked.push(val);
    }

    this.setState({ checked });

    // convert checked strings to ints and add them to dateArray (sorted)
    let c, n;
    for (c in checked) {
      if (checked[c]) {
        n = parseInt(checked[c], 10);
        dateArray.push(n);
      }
    }
    dateArray.sort();

    this.onDateChange(dateArray);
  }

  render() {
    return (
      <div className="date-filter">
        <div><input type="checkbox" className="date-check" value="0" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[0]} /> {this.datesDataDisplay[0]}</div>
        <div><input type="checkbox" className="date-check" value="1" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[1]} /> {this.datesDataDisplay[1]}</div>
        <div><input type="checkbox" value="2" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[2]} /> {this.datesDataDisplay[2]}</div>
        <div><input type="checkbox" value="3" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[3]} /> {this.datesDataDisplay[3]}</div>
        <div><input type="checkbox" value="4" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[4]} /> {this.datesDataDisplay[4]}</div>
        <div><input type="checkbox" value="5" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[5]} /> {this.datesDataDisplay[5]}</div>
        <div><input type="checkbox" value="6" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[6]} /> {this.datesDataDisplay[6]}</div>
        <div><input type="checkbox" value="7" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[7]} /> {this.datesDataDisplay[7]}</div>
        <br />
      </div>
    );
  }
}

export default DateFilter;
