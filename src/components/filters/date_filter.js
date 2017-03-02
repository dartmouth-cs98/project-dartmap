/*
  Filters by date
  Based on the upcoming week or next 2 weeks
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';

import { convertDatesToDisplay } from '../../helpers/date-data-helper';

// Display today and the next 6 days as filter options
// and an option for the next 2 weeks
const NUM_DAYS_DISPLAY = 8;

// Check the next 2 days by default
const DEFAULT_CHECKED = [true,true,false,false,false,false,false,false];
const DEFAULT_DATES = ["0","1"];

// Array of dates with labels and values both set
// to the date
var DATES = [];

class DateFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: DEFAULT_DATES,
      expanded: false,
    }

     // receives the dates data object passed down from index.js
    this.datesData = this.props.dateBarData;
    if (this.datesData) {
      // dictionary of date strings to be displayed onscreen
      this.datesDataDisplay = convertDatesToDisplay(this.datesData);
    } else {
      this.datesDataDisplay = null;
    }

    for (var i = 0; i < NUM_DAYS_DISPLAY; ++i) {
      if (this.datesDataDisplay[i] != undefined) {
        DATES.push(this.datesDataDisplay[i]);
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.showCheckboxes = this.showCheckboxes.bind(this);
    this.onDateChange = props.onDateChange;
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  handleChange(event) {
    
    const val = event.target.value;
    let checked = this.state.checked.slice(); // copy
    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
      if ((checked.includes('7'))) {
        document.getElementById('d7').checked = false;
        checked.splice(checked.indexOf('7'), 1);
      }
    } else {
      checked.push(val);
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

    var dateArray=[];
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

  showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!this.state.expanded) {
      this.setState({ expanded : true });
    } else {
      this.setState({ expanded : false });
    }
  }

  render() {
    if (this.datesDataDisplay === null) {
      return <div className="hidden" />;
    }
    else if (!this.state.expanded) {
      return (
        <form>
      <div className="multiselect">
        <div className="selectBox" onClick={this.showCheckboxes}>
          <select>
            <option>Filter by Dates </option>
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
        <div className="selectBox" onClick={this.showCheckboxes}>
          <select>
            <option>Filter by Dates</option>
          </select>
          <div className="overSelect"></div>
        </div>
        <div className="checkboxes-dropdown" id="checkboxes">

        <div >
          <input type="checkbox" id="d0" name="d0" value="0" onChange={this.handleChange} defaultChecked={DEFAULT_CHECKED[0]} />
          <label htmlFor="d0" data-value={DATES[0]}>{DATES[0]}</label>
        </div>
        <div >
          <input type="checkbox" id="d1" name="d1" value="1" onChange={this.handleChange} defaultChecked={DEFAULT_CHECKED[1]} />
          <label htmlFor="d1" data-value={DATES[1]}>{DATES[1]}</label>
        </div>
        <div >
          <input type="checkbox" id="d2" name="d2" value="2" onChange={this.handleChange} defaultChecked={DEFAULT_CHECKED[2]} />
          <label htmlFor="d2" data-value={DATES[2]}>{DATES[2]}</label>
        </div>
        <div >
          <input type="checkbox" id="d3" name="d3" value="3" onChange={this.handleChange} defaultChecked={DEFAULT_CHECKED[3]} />
          <label htmlFor="d3" data-value={DATES[3]}>{DATES[3]}</label>
        </div>
        <div >
          <input type="checkbox" id="d4" name="d4" value="4" onChange={this.handleChange} defaultChecked={DEFAULT_CHECKED[4]} />
          <label htmlFor="d4" data-value={DATES[4]}>{DATES[4]}</label>
        </div>
        <div >
          <input type="checkbox" id="d5" name="d5" value="5" onChange={this.handleChange} defaultChecked={DEFAULT_CHECKED[5]} />
          <label htmlFor="d5" data-value={DATES[5]}>{DATES[5]}</label>
        </div>
        <div >
          <input type="checkbox" id="d6" name="d6" value="6" onChange={this.handleChange} defaultChecked={DEFAULT_CHECKED[6]} />
          <label htmlFor="d6" data-value={DATES[6]}>{DATES[6]}</label>
        </div>
        <div >
          <input type="checkbox" id="d7" name="d7" value="7" onChange={this.handleChange} defaultChecked={DEFAULT_CHECKED[7]} />
          <label htmlFor="d7" data-value={DATES[7]}>{DATES[7]}</label>
        </div>
        </div>
      </div>
    </form>

    );
  }
}

const mapStateToProps = state => (
  {
    dateBarData: state.events.dateBarData,
  }
);

export default connect(mapStateToProps, null)(DateFilter);
