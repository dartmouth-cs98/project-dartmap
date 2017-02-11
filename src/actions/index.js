// actions/index.js
// This file initializes all the possible actions

import { postNewEvent, getAllEvents, getEvent } from '../helpers/dartmap-api';
import { getLocationFromZipcode } from '../helpers/google-maps';

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
  RETRY_EVENT: 'RETRY_EVENT',
  GET_LOCATION: 'GET_LOCATION',
  RETRY_LOCATION: 'RETRY_LOCATION',
  LOCATION_FAIL: 'LOCATION_FAIL',
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
    if (!latitude || !longitude) {
      dispatch({ type: ActionTypes.RETRY_EVENT, payload: null });
    } else {
      getAllEvents(dispatch, ActionTypes.FETCH_EVENTS,
        ActionTypes.EVENT_FAIL, latitude, longitude, radius);
    }
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

export function getLocation() {
  return (dispatch) => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch({
          type: ActionTypes.GET_LOCATION,
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      }, (error) => {
        dispatch({
          type: ActionTypes.LOCATION_FAIL,
          payload: { error },
        });
      });
    } else {
      dispatch({ type: ActionTypes.RETRY_LOCATION, payload: null });
    }
  };
}

export function getZipcodeLocation(zipcode) {
  return (dispatch) => {
    getLocationFromZipcode(zipcode, dispatch, ActionTypes.GET_LOCATION,
      ActionTypes.LOCATION_FAIL);
  };
}
