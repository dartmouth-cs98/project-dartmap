/*
  Filters by date
  Based on the upcoming week or next 2 weeks
*/

import React from 'react';
import Rcslider from 'rc-slider';

// function log(value) {
//   console.log(value);
// }

// converts a Date() object into a string to display
function getDayString(dateObj) {
  const dayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = new Date();
  var twoWeeks = new Date();
  twoWeeks.setDate(today.getDate() + 14);

  if (dateObj.getDate() === today.getDate()) {
    return 'today';
  } else if (dateObj.getDate() === twoWeeks.getDate()) {
    return '2 weeks from now';
  } else {
    const day = dateObj.getDay();
    return dayArray[day];
  }
}

// converts a dictionary of dates to strings to display
function convertDatesToDisplay(datesData) {
  let datesDataDisplay = {};
  const numberOfDays = Object.keys(datesData).length;
  let i;
  for (i = 0; i < numberOfDays; i += 1) {
    datesDataDisplay[i] = getDayString(datesData[i]);
  }
  return datesDataDisplay;
}

const DateFilter = (props) => {
  // receives the dates data object passed down from index.js
  const datesData = props.dateBarData;

  // dictionary of date strings to be displayed onscreen
  const datesDataDisplay = convertDatesToDisplay(datesData);

  return (
    <Rcslider marks={datesDataDisplay} min={0} max={7} allowCross={false} range dots step={1} defaultValue={[0, 2]} onAfterChange={props.onDateChange} />
  );
};

export default DateFilter;
