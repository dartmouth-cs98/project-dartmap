// actions/index.js
// This file initializes all the possible actions

import { getAllEventsRedux } from '../helpers/dartmap-api';

// keys for ActionTypes
export const ActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  FETCH_EVENTS: 'FETCH_EVENTS',
  FETCH_FAIL: 'FETCH_FAIL',
  FETCH_EVENT: 'FETCH_EVENT',
  // CREATE_EVENT: 'CREATE_EVENT',
  // UPDATE_EVENT: 'UPDATE_EVENT',
  // DELETE_EVENT: 'DELETE_EVENT',
};

// export function login() {
//   return {
//     type: ActionTypes.LOGIN,
//     payload: null,
//   };
// }
//
// export function logout() {
//   return {
//     type: ActionTypes.LOGOUT,
//     payload: null,
//   };
// }

export function fetchEvents(latitude, longitude, radius) {
  // ActionCreator returns a function
  // that gets called with dispatch
  return (dispatch) => {
    // can now dispatch stuff
    getAllEventsRedux(dispatch, ActionTypes.FETCH_EVENTS,
      ActionTypes.FETCH_FAIL, latitude, longitude, radius);
  };
}
