// date-data-helper.js

/*
 * creates the date data object based on today's date
 * date data object: {0: Date(), 1: today.getDate()+1, ..., 6: today.getDate()+6, 7: today.getDate()+14}
 */
function createDateData() {
  const today = new Date();
  const obj = {};
  let i;
  // iterate over the week and add in each day
  for (i = 0; i < 14; i += 1) {
    const newDate = new Date();
    newDate.setDate(today.getDate() + i);
    obj[i] = newDate;
  }
  return obj;
}

// converts a Date() object into a string to display
function getDayString(dateObj) {
  const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const twoWeeks = new Date();
  twoWeeks.setDate(today.getDate() + 7);

  if (dateObj.getDate() === today.getDate()) {
    return 'Today';
  } else if (dateObj.getDate() === today.getDate() + 1) {
    return 'Tomorrow';
  } else if (dateObj.getDate() === twoWeeks.getDate()) {
    return 'All future events';
  } else {
    const day = dateObj.getDay();
    return dayArray[day];
  }
}

// converts a dictionary of dates to strings to display
function convertDatesToDisplay(datesData) {
  const datesDataDisplay = {};
  const numberOfDays = Object.keys(datesData).length;
  let i;
  for (i = 0; i < numberOfDays; i += 1) {
    datesDataDisplay[i] = getDayString(datesData[i]);
  }
  return datesDataDisplay;
}

export default createDateData;
export { convertDatesToDisplay };
