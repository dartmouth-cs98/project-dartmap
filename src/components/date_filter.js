/*
	Filters by date
	Based on the upcoming week or next 2 weeks
*/

import React from 'react';
require('rc-slider/assets/index.css');
import Rcslider from 'rc-slider';


function log(value) {
  console.log(value);
}

// converts a dictionary of dates to strings to display
function convertDatesToDisplay(datesData) {
	var datesDataDisplay = {};
	var numberOfDays = Object.keys(datesData).length
	for (var i=0; i<numberOfDays; i++) {
		datesDataDisplay[i] = getDayString(datesData[i]);
	}
	return datesDataDisplay
}

// converts a Date() object into a string to display
function getDayString(dateObj) {
	var dayArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	var today = new Date();
	var twoWeeks = new Date();
	twoWeeks.setDate(today.getDate()+14);

	if (dateObj.getDate() == today.getDate()) {
		return "today";
	}
	else if (dateObj.getDate() == twoWeeks.getDate()) {
		return "2 weeks from now";
	}
	else {
		var day = dateObj.getDay();
		return dayArray[day];
	}
}

const DateFilter = (props) => {
	// receives the dates data object passed down from index.js
	var datesData = props.dateBarData;

	// dictionary of date strings to be displayed onscreen
	var datesDataDisplay = convertDatesToDisplay(datesData);

  return (
    <Rcslider marks={datesDataDisplay} min={0} max={7} allowCross={false} range dots step={1} defaultValue={[0, 2]} onAfterChange={props.onDateChange} />
  );
};

export default DateFilter;
