/*
  Filters by date
  Based on the upcoming week or next 2 weeks
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';

import { convertDatesToDisplay } from '../../helpers/date-data-helper';

// Display the next 7 days as filter options
// and an option for the next 2 weeks
const NUM_DAYS_DISPLAY = 8;

// Check the next 2 days by default
const DEFAULT_DATES = [
  { label: 'Today', value: 'Today' },
  { label: 'Tomorrow', value: 'Tomorrow' },
];

// Array of dates with labels and values both set
// to the date
const DATES = [];

// Array of dates for handleChange
const DATES_ARRAY = [];

const CATEGORIES = [
  { label: 'Academic', value: 'Academic'},
  { label: 'Art', value: 'Art'},
  { label: 'Sports', value: 'Sports'},
  { label: 'Performance', value: 'Performance'},
  { label: 'Lecture', value: 'Lecture'},
  { label: 'Greek Life', value: 'Greek Life'},
  { label: 'Free Food', value: 'Free Food'},
]

class DateFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: DEFAULT_DATES,
    }

     // receives the dates data object passed down from index.js
    this.datesData = this.props.dateBarData;
    if (this.datesData) {
      // dictionary of date strings to be displayed onscreen
      this.datesDataDisplay = convertDatesToDisplay(this.datesData);
    } else {
      this.datesDataDisplay = null;
    }
    var val = 0;
    for (var i = 0; i < NUM_DAYS_DISPLAY; ++i) {
      if (this.datesDataDisplay[i] != undefined) {
        var single_date = {};
        // single_date['value'] = val;
        single_date['value'] = this.datesDataDisplay[i];
        single_date['label'] = this.datesDataDisplay[i]; 
        DATES.push(single_date);
        DATES_ARRAY.push(this.datesDataDisplay[i]);
      }
      val += 1;
    }

    this.handleChange = this.handleChange.bind(this);
    this.onDateChange = props.onDateChange;
  }

  handleChange(value) {
    
    this.setState({ value });
    var days = value.split(",");
    var dateArray = [];
    for (var i = 0; i < days.length; ++i) {
      if (days[i] != undefined) {
        var index = DATES_ARRAY.indexOf(days[i]);
        if (index != -1) {
          dateArray.push(index);
        }
      }
    }
    dateArray.sort();

    // Check if selected the All of the next 2 weeks option
    if (dateArray[dateArray.length-1] == 7) {
      dateArray=[0,1,2,3,4,5,6,7];
      this.setState( { value: DATES});
    }
    console.log('date Array is',dateArray);
    this.onDateChange(dateArray);
  }


  render() {
    if (this.datesDataDisplay === null) {
      return <div className="hidden" />;
    }
    const dropdownValues = DATES;
    return (
      <div className="add-event-form" style={{ height: '70px' }}>
         <div className="add-event-fields">
          <Select multi simpleValue
            options={dropdownValues}
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Enter Time to find Events"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    dateBarData: state.events.dateBarData,
  }
);

export default connect(mapStateToProps, null)(DateFilter);
