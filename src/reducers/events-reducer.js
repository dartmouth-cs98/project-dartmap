// events-reducer.js
// This file contains the reducers for the events state

import { ActionTypes } from '../actions';

const EventsReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ActionTypes.FETCH_EVENTS:
      console.log(action);
      newState = Object.assign({}, state, { events: { all: action.payload.events } });
      return newState;
    default:
      return state;
  }
};

export default EventsReducer;
