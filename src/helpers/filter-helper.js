// filter-helper.js

import { filterDates, filterTimes, sortDateTime } from './date-time-filters-helper';
import { filterCategories } from './category-filters-helper';

const TIMES_DATA_DISPLAY = { 0: 8, 1: 10, 2: 12, 3: 14, 4: 16, 5: 18, 6: 20, 7: 22, 8: 24, 9: 26 };
const DEFAULT_DATE_FILTER = [0, 1];
const DEFAULT_TIME_FILTER = [0, 9];

export default function filterEventList(theFilters, eventList, categoriesList, dateBarData) {
  let filteredEvents = [];
  const filters = theFilters || {};

  if (filters.selectedDate == null) {
    filters.selectedDate = DEFAULT_DATE_FILTER;
  }
  if (filters.selectedTime == null) {
    filters.selectedTime = DEFAULT_TIME_FILTER;
  }
  if (!filters.selectedCategories) {
    filters.selectedCategories = [];
  }

  filteredEvents = filterDates(filters, dateBarData, eventList);
  filteredEvents = filterTimes(filters, TIMES_DATA_DISPLAY, filteredEvents.slice());
  filteredEvents = filterCategories(filters, categoriesList, filteredEvents.slice());

  // sort all filtered events first by date and then by time
  filteredEvents.sort(sortDateTime);

  // only important for the very beginning (see the render() method)
  // console.log(filteredEvents);
  return { filters, filteredEventList: filteredEvents };
}
