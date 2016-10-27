/*
  Filters by date
  Based on the upcoming week or next 2 weeks
*/

import React from 'react';
import Rcslider from 'rc-slider';
import { convertDatesToDisplay } from '../helpers/date-data-helper';

// function log(value) {
//   console.log(value);
// }


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
