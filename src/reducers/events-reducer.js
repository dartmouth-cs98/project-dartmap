// events-reducer.js
// This file contains the reducers for the events state

import { ActionTypes } from '../actions';

import filterEvents from '../helpers/filter-helper';
import createDateData from '../helpers/date-data-helper';

const EventsReducer = (state = {}, action) => {
  let newState, newFilters;
  switch (action.type) {
    case ActionTypes.FETCH_EVENTS:
      newState = filterEvents(state.filters, action.payload.events,
        state.catList, state.dateBarData);
      newState = Object.assign({}, state, newState);
      newState.all = action.payload.events;
      return newState;
    case ActionTypes.RETRY_EVENT:
      newState = Object.assign({}, state, { all: ['retry'] });
      return newState;
    case ActionTypes.FILTER_EVENTS:
      if (!state.all) {
        return state;
      }
      newFilters = filterEvents(action.payload.filters, state.all,
        state.catList, state.dateBarData);
      newState = Object.assign({}, state);
      newState.filters = newFilters.filters;
      newState.filteredEventList = newFilters.filteredEventList;
      return newState;
    case ActionTypes.FETCH_CATEGORIES:
      newState = Object.assign({}, state);
      newState.catList = action.payload.catList;
      return newState;
    case ActionTypes.SET_DATE_DATA:
      newState = Object.assign({}, state);
      newState.dateBarData = createDateData();
      return newState;
    default:
      return state;
  }
};

export default EventsReducer;
