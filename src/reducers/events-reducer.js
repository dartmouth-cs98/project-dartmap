// events-reducer.js
// This file contains the reducers for the events state

import { ActionTypes } from '../actions';

import filterEvents from '../helpers/filter-helper';

const EventsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ActionTypes.FETCH_EVENTS:
      newState = Object.assign({}, state);
      newState.all = action.payload.events;
      return newState;
    case ActionTypes.RETRY_EVENT:
      newState = Object.assign({}, state, { all: ['retry'] });
      return newState;
    case ActionTypes.FILTER_EVENTS:
      if (!state.all) {
        return state;
      }
      newState = filterEvents(action.payload.filters, state.all,
        action.payload.categoriesList, action.payload.dateBarData);
      newState = Object.assign({}, state, newState);
      return newState;
    default:
      return state;
  }
};

export default EventsReducer;
