// reducers/map-reducer.js
// This file contains the reducers for the map state

import { ActionTypes } from '../actions';

const MapReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ActionTypes.GET_LOCATION:
      newState = Object.assign({}, state);
      newState.center = {
        lat: action.payload.latitude,
        lng: action.payload.longitude,
      };
      return newState;
    case ActionTypes.SET_MAP_CENTER:
      newState = Object.assign({}, state);
      newState.center = action.payload.center;
      return newState;
    case ActionTypes.SET_STICKY_BALLOON_ID:
      newState = Object.assign({}, state);
      newState.stickyBalloonId = action.payload.locationId;
      return newState;
    case ActionTypes.SET_BALLOON_ID:
      newState = Object.assign({}, state);
      newState.balloonId = action.payload.locationId;
      return newState;
    case ActionTypes.CLEAR_BALLOONS:
      newState = Object.assign({}, state);
      newState.balloonId = null;
      newState.stickyBalloonId = null;
      return newState;
    default:
      return state;
  }
};

export default MapReducer;
