// actions/index.js
// This file initializes all the possible actions

import { postNewEvent, getAllEvents, getEvent } from '../helpers/dartmap-api';
import { filterEventList } from '../helpers/filter-helper';

// keys for ActionTypes
export const ActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  FETCH_EVENTS: 'FETCH_EVENTS',
  EVENT_FAIL: 'EVENT_FAIL',
  FETCH_EVENT: 'FETCH_EVENT',
  CREATE_EVENT: 'CREATE_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  FILTER_EVENTS: 'FILTER_EVENTS',
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
  return (dispatch) => {
    getAllEvents(dispatch, ActionTypes.FETCH_EVENTS,
      ActionTypes.EVENT_FAIL, latitude, longitude, radius);
  };
}

export function fetchEvent(eventId) {
  return (dispatch) => {
    getEvent(dispatch, ActionTypes.FETCH_EVENT,
      ActionTypes.EVENT_FAIL, eventId);
  };
}

export function createEvent(event) {
  return (dispatch) => {
    postNewEvent(dispatch, ActionTypes.CREATE_EVENT,
      ActionTypes.EVENT_FAIL, event);
  };
}

export function filterEvents(filters, categoriesList, dateBarData) {
  return {
    type: ActionTypes.FILTER_EVENTS,
    payload: { filters, categoriesList, dateBarData },
  };
}
