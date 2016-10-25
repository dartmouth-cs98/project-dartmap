/*
	Filters by date
	Based on the upcoming week or next 2 weeks
*/

import React, { Component } from 'react';

// dates that are checked by default
var DEFAULT_DATES = [true, true, false, false, false, false, false, false];

function log(val) {
	console.log(val);
}

// converts a dictionary of dates to strings to display
function convertDatesToDisplay(datesData) {
	var datesDataDisplay = [];
	var numberOfDays = Object.keys(datesData).length
	for (var i=0; i<numberOfDays; i++) {
		datesDataDisplay.push(getDayString(datesData[i]));
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

class DateFilter extends React.Component {

	constructor(props) {
		super(props);

		// set which dates (strings) should be checked by default
		var defaultDates = [];
		for (var i = 0; i < DEFAULT_DATES.length; i++) {
			if (DEFAULT_DATES[i])
				defaultDates.push(i.toString());
		}

		// receives the dates data object passed down from index.js
		var datesData = props.dateBarData;

		// dictionary of date strings to be displayed onscreen
		this.datesDataDisplay = convertDatesToDisplay(datesData);

		this.state = {checked: defaultDates};
		this.handleChange = this.handleChange.bind(this);
		this.onDateChange = props.onDateChange;
	}

	handleChange(event) {
		let val = event.target.value;
		let checked = this.state.checked.slice(); // copy

		// the array of checked dates to send, e.g. [0, 1, 2, 5, 6]
		var dateArray = [];

		if(checked.includes(val)) {
			checked.splice(checked.indexOf(val), 1);
		} else {
			checked.push(val);
		}

		this.setState({checked: checked})

		// convert checked strings to ints and add them to dateArray (sorted)
		var c,n;
		for (c in checked) {
			n = parseInt(checked[c], 10);
			dateArray.push(n);
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


