// reducers/user-reducer.js
// This file contains the reducers for the user state

import { ActionTypes } from '../actions';

const UserReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ActionTypes.GET_LOCATION:
      newState = Object.assign({}, state, {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      });
      return newState;
    case ActionTypes.LOCATION_FAIL:
      newState = Object.assign({}, state, {
        latitude: null,
        longitude: null,
      });
      return newState;
    case ActionTypes.RETRY_LOCATION:
      newState = Object.assign({}, state, {
        latitude: 'retry',
        longitude: 'retry',
      });
      return newState;
    case ActionTypes.GET_FB_LOGIN_STATUS:
      newState = Object.assign({}, state, action.payload);
      if (newState.fbResponse) newState.loggedIn = (newState.fbResponse.status === 'connected');
      return newState;
    case ActionTypes.LOGIN:
      newState = Object.assign({}, state, action.payload);
      if (newState.fbResponse) newState.loggedIn = (newState.fbResponse.status === 'connected');
      return newState;
    case ActionTypes.LOGOUT:
      newState = {};
      newState.latitude = state.latitude;
      newState.longitude = state.longitude;
      newState.loggedIn = false;
      newState.jwt = null;
      return newState;
    default:
      return state;
  }
};

export default UserReducer;
