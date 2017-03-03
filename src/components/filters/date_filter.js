/*
  Filters by date
  Based on the upcoming week or next 2 weeks
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      checked_boolean: DEFAULT_CHECKED,
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
    // this.onDateChange = props.onDateChange;
    this.filterEvent = this.filterEvent.bind(this);
  }

  componentWillMount = () => {
    this.filterEvent([0,1]);
    this.selectedCheckboxes = new Set();
  }

  handleChange(event) {
    
    const val = event.target.value;
    let checked = this.state.checked.slice(); // copy
    let checked_boolean = this.state.checked_boolean.slice();
    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
      checked_boolean[val]=false;
      if ((checked.includes('7'))) {
        document.getElementById('d7').checked = false;
        checked.splice(checked.indexOf('7'), 1);
        checked_boolean[7]=false;
      }
    } else {
      checked.push(val);
      checked_boolean[val]=true;
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
        checked_boolean = [true,true,true,true,true,true,true,true];
      }
    }
    this.setState({ checked });
    this.setState({ checked_boolean });
    this.filterEvent(checked);
  }

  filterEvent(checked) {
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
    this.props.onDateChange(dateArray);
  }


  showCheckboxes() {
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
            <option>Filter by Date </option>
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
            <option>Filter by Date </option>
          </select>
          <div className="overSelect"></div>
        </div>
        <div className="checkboxes-dropdown" id="checkboxes">

        <div >
         <label htmlFor="d0">
          <input type="checkbox" id="d0" name="d0" value="0" 
          onChange={this.handleChange} checked={this.state.checked_boolean[0]} 
          data-value={DATES[0]} />     {DATES[0]}</label>
        </div>

        <div >
        <label htmlFor="d1">
          <input type="checkbox" id="d1" name="d1" value="1" 
          onChange={this.handleChange} checked={this.state.checked_boolean[1]} 
           data-value={DATES[1]} />     {DATES[1]}</label>
        </div>

        <div >
        <label htmlFor="d2">
          <input type="checkbox" id="d2" name="d2" value="2" 
          onChange={this.handleChange} checked={this.state.checked_boolean[2]} 
           data-value={DATES[2]} />     {DATES[2]}</label>
        </div>

        <div >
        <label htmlFor="d3">
          <input type="checkbox" id="d3" name="d3" value="3" 
          onChange={this.handleChange} checked={this.state.checked_boolean[3]} 
           data-value={DATES[3]} />     {DATES[3]}</label>
        </div>

        <div >
         <label htmlFor="d4" >
          <input type="checkbox" id="d4" name="d4" value="4" 
          onChange={this.handleChange} checked={this.state.checked_boolean[4]} 
         data-value={DATES[4]} />     {DATES[4]}</label>
        </div>

        <div >
        <label htmlFor="d5">
          <input type="checkbox" id="d5" name="d5" value="5" 
          onChange={this.handleChange} checked={this.state.checked_boolean[5]} 
          data-value={DATES[5]}/>     {DATES[5]}</label>
        </div>

        <div >
        <label htmlFor="d6">
          <input type="checkbox" id="d6" name="d6" value="6" 
          onChange={this.handleChange} checked={this.state.checked_boolean[6]} 
           data-value={DATES[6]} />     {DATES[6]}</label>
        </div>

        <div >
        <label htmlFor="d7" >
          <input type="checkbox" id="d7" name="d7" value="7" 
          onChange={this.handleChange} checked={this.state.checked_boolean[7]} 
          data-value={DATES[7]} />     {DATES[7]}</label>
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
