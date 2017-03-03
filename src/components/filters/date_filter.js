/*
  Filters by date
  Based on the upcoming week or next 2 weeks
*/

import React, { Component } from 'react';

import { convertDatesToDisplay } from '../../helpers/date-data-helper';

// dates that are checked by default
const DEFAULT_DATES = [true, true, false, false, false, false, false, false];

class DateFilter extends Component {

  constructor(props) {
    super(props);

    // set which dates (strings) should be checked by default
    const defaultDates = [];
    for (let i = 0; i < DEFAULT_DATES.length; i += 1) {
      if (DEFAULT_DATES[i]) defaultDates.push(i.toString());
    }

    // receives the dates data object passed down from index.js
    this.datesData = null;

    // dictionary of date strings to be displayed onscreen
    this.datesDataDisplay = null;

    this.state = { checked: defaultDates };
    this.handleChange = this.handleChange.bind(this);
    this.onDateChange = props.onDateChange;
  }

  componentWillMount() {
    this.datesData = this.props.dateBarData;
    if (this.datesData) {
      this.datesDataDisplay = convertDatesToDisplay(this.datesData);
    }
  }

  componentWillUpdate() {
    if (this.props.dateBarData && !this.datesDataDisplay) {
      this.datesData = this.props.dateBarData;
      this.datesDataDisplay = convertDatesToDisplay(this.datesData);
    }
  }

  handleChange(event) {
    const val = event.target.value;
    let checked = this.state.checked.slice(); // copy

    // the array of checked dates to send, e.g. [0, 1, 2, 5, 6]
    const dateArray = [];

    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
      // if a different box is being unchecked and box 7 is checked
      if ((checked.includes('7'))) {
        document.getElementById('d7').checked = false;
        checked.splice(checked.indexOf('7'), 1);
      }
    } else {
      checked.push(val);
      // if the next two weeks are selected
      if (val === '7') {
        // check every box
        document.getElementById('d0').checked = true;
        document.getElementById('d1').checked = true;
        document.getElementById('d2').checked = true;
        document.getElementById('d3').checked = true;
        document.getElementById('d4').checked = true;
        document.getElementById('d5').checked = true;
        document.getElementById('d6').checked = true;
        checked = ['0', '1', '2', '3', '4', '5', '6', '7'];
      }
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
    if (this.datesDataDisplay === null) {
      return <div className="hidden" />;
    }
    return (
      <div className="date-filter section-inner">
        <div className="segmented-control">
          <input type="checkbox" id="d0" name="d0" value="0" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[0]} />
          <label htmlFor="d0" data-value={this.datesDataDisplay[0]}>{this.datesDataDisplay[0]}</label>
        </div>
        <div className="segmented-control">
          <input type="checkbox" id="d1" name="d1" value="1" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[1]} />
          <label htmlFor="d1" data-value={this.datesDataDisplay[1]}>{this.datesDataDisplay[1]}</label>
        </div>
        <div className="segmented-control">
          <input type="checkbox" id="d2" name="d2" value="2" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[2]} />
          <label htmlFor="d2" data-value={this.datesDataDisplay[2]}>{this.datesDataDisplay[2]}</label>
        </div>
        <div className="segmented-control">
          <input type="checkbox" id="d3" name="d3" value="3" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[3]} />
          <label htmlFor="d3" data-value={this.datesDataDisplay[3]}>{this.datesDataDisplay[3]}</label>
        </div>
        <div className="segmented-control">
          <input type="checkbox" id="d4" name="d4" value="4" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[4]} />
          <label htmlFor="d4" data-value={this.datesDataDisplay[4]}>{this.datesDataDisplay[4]}</label>
        </div>
        <div className="segmented-control">
          <input type="checkbox" id="d5" name="d5" value="5" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[5]} />
          <label htmlFor="d5" data-value={this.datesDataDisplay[5]}>{this.datesDataDisplay[5]}</label>
        </div>
        <div className="segmented-control">
          <input type="checkbox" id="d6" name="d6" value="6" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[6]} />
          <label htmlFor="d6" data-value={this.datesDataDisplay[6]}>{this.datesDataDisplay[6]}</label>
        </div>
        <div className="segmented-control">
          <input type="checkbox" id="d7" name="d7" value="7" onChange={this.handleChange} defaultChecked={DEFAULT_DATES[7]} />
          <label htmlFor="d7" data-value={this.datesDataDisplay[7]}>{this.datesDataDisplay[7]}</label>
        </div>
        <br />
      </div>
    );
  }
}

export default DateFilter;
