// events-reducer.js
// This file contains the reducers for the events state

import { ActionTypes } from '../actions';

import filterEventList from '../helpers/filter-helper';
import createDateData from '../helpers/date-data-helper';

const EventsReducer = (state = {}, action) => {
  let newState, newFilters;
  switch (action.type) {
    case ActionTypes.FETCH_EVENTS:
      newState = filterEventList(state.filters, action.payload.events,
        state.catList, state.dateBarData);
      newState = Object.assign({}, state, newState);
      newState.all = action.payload.events;
      return newState;
    case ActionTypes.FETCH_USER_EVENTS:
      newState = Object.assign({}, state, newState);
      newState.userEvents = action.payload.events;
      return newState;
    case ActionTypes.FETCH_RSVP_EVENTS:
      newState = Object.assign({}, state, newState);
      newState.rsvps = action.payload.events;
      return newState;
    case ActionTypes.RSVP_CREATED:
      newState = Object.assign({}, state, newState);
      newState.rsvps = null;
      return newState;
    case ActionTypes.RSVP_REMOVED:
      newState = Object.assign({}, state, newState);
      newState.rsvps = null;
      return newState;
    case ActionTypes.FETCH_EVENT:
      newState = Object.assign({}, state);
      newState.currentEvent = action.payload.event;
      return newState;
    case ActionTypes.UNFETCH_EVENT:
      newState = Object.assign({}, state);
      newState.currentEvent = null;
      return newState;
    case ActionTypes.RETRY_EVENT:
      newState = Object.assign({}, state, { all: ['retry'] });
      return newState;
    case ActionTypes.FILTER_EVENTS:
      if (!state.all || state.all[0] === 'retry') {
        newFilters = { filters: action.payload.filters };
      } else {
        newFilters = filterEventList(action.payload.filters, state.all,
          state.catList, state.dateBarData);
      }
      newState = Object.assign({}, state, newFilters);
      return newState;
    case ActionTypes.FETCH_CATEGORIES:
      newState = Object.assign({}, state);
      newState.catList = [];
      for (let i = 0; i < action.payload.catList.length; i += 1) {
        const cat = action.payload.catList[i];
        newState.catList.push({
          label: cat.name,
          value: cat.id,
        });
      }
      return newState;
    case ActionTypes.SET_DATE_DATA:
      newState = Object.assign({}, state);
      newState.dateBarData = createDateData();
      return newState;
    case ActionTypes.EVENT_FAIL:
      newState = Object.assign({}, state);
      newState.events.error = action.payload;
      return newState;
    default:
      return state;
  }
};

export default EventsReducer;
