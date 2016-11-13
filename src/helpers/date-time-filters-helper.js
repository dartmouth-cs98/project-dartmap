// date-data-helper.js

// import for time filtering
import moment from 'moment';

function filterDates(filters, dateKey, eventList) {
  let filteredDates = [];
  const filteredEvents = [];

  // iterate through each selected date
  let i;
  for (i = 0; i < filters.selectedDate.length; i += 1) {
    const dateIdx = filters.selectedDate[i];
    // if the date index indicates "next 2 weeks"
    if (dateIdx > 6) {
      let j;
      filteredDates = [];
      // add every date within the next 2 weeks
      for (j = 0; j < Object.keys(dateKey).length; j += 1) {
        filteredDates.push(dateKey[j].getDate());
      }
    } else {
      filteredDates.push(dateKey[dateIdx].getDate());
    }
  }
  for (i = 0; i < eventList.length; i += 1) {
    const event = eventList[i];
    const eventDate = eventList[i].date.date();
    // if this date is one of the allowed filter dates
    if (filteredDates.indexOf(eventDate) >= 0) {
      filteredEvents.push(event);
    }
    // filteredDates.push(dateKey[dateIdx].getDate());
  }
  return filteredEvents;
}

// takes in all filters and the list of events and returns a list of only the events that pass through the filter
function filterTimes(filters, timeKey, eventList) {
  const startIdx = filters.selectedTime[0];
  const endIdx = filters.selectedTime[1];
  const startTime = timeKey[startIdx];
  const endTime = timeKey[endIdx];

  const filteredEvents = [];
  let i = 0;
  for (i = 0; i < eventList.length; i += 1) {
    let time = null;
    let timeHour = null;
    let timeMinute = null;

    timeHour = eventList[i].start_time.hour();
    timeMinute = (eventList[i].start_time.minute()) / 100;

    // if the time is before 6am
    if (timeHour < 6) {
      // set the time to be 24 hours larger for comparison purposes
      timeHour += 24;
    }
    // formats time as hour.minute
    time = timeHour + timeMinute;

    if (time >= startTime) {
      if (time <= endTime) {
        filteredEvents.push(eventList[i]);
      }
    }
  }
  return filteredEvents;
}

// given two events, sort them based on day and then time
function sortDateTime(a, b) {
  // first check the date
  if (moment(a.date).isBefore(b.date)) {
    return -1;
  } else if (moment(a.date).isAfter(b.date)) {
    return 1;
  }
  // otherwise, the dates are the same, so check the time
  const aTime = moment(a.start_time).hour() + ((moment(a.start_time).minute()) / 100);
  const bTime = moment(b.start_time).hour() + ((moment(b.start_time).minute()) / 100);
  return parseFloat(aTime) - parseFloat(bTime);
}

export default filterDates;
export { filterDates, filterTimes, sortDateTime };
