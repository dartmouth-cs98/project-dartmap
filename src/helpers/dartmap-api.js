// dartmap-api.js
// This file contains all the functions used to interact with the dartmap backend api.
import $ from 'jquery';
import moment from 'moment';

const API_URL = 'https://dartmapapi.herokuapp.com/api/';
const AUTH_URL = 'auth/';
const CATEGORY_URL = 'categories/';
const EVENT_URL = 'events/';
const USERS_URL = 'users/';

/**
 * formatAPIEventData() returns an event formatted to work with the front-end
 *
 * @param {Object} the event object returned by the API
 * @return {Object} the flattened event object
 */
function formatAPIEventData(event) {
  const newEvent = {};
  // event data
  newEvent.name = event.name;
  newEvent.id = event.id;
  newEvent.organizer = event.organizer;
  newEvent.icon_url = event.icon_url;
  newEvent.description = event.description;
  newEvent.location_string = event.location_string;
  newEvent.icon_url = event.icon_url;
  newEvent.date = moment(event.date, 'YYYY-MM-DD');
  newEvent.start_time = moment(event.start_time, 'HH:mm');
  newEvent.end_time = moment(event.end_time, 'HH:mm');
  // location data
  newEvent.location_id = event.location.id;
  newEvent.lat = event.location.latitude;
  newEvent.lng = event.location.longitude;
  newEvent.location_name = event.location.name;
  // categories data
  const catString = event.categories.replace(/'/g, '"').replace(/ u"/g, ' "');
  newEvent.categories = $.parseJSON(catString);

  return newEvent;
}

/**
 * formatEventDataforAPI() returns an event formatted to work with the back-end
 *
 * @param {Object} the event object created by the AddEventDialog component
 * @return {Object} the event information formatted for a post to the API
 */
function formatEventDataforAPI(event) {
  const eventData = {};
  eventData.name = event.name;
  eventData.description = event.description;
  eventData.organizer = event.organizer;
  eventData.icon_url = event.icon_url;
  eventData.location_string = event.location_string;
  eventData.start_time = event.start_time.format('HH:mm');
  eventData.end_time = event.end_time.format('HH:mm');
  eventData.date = event.date.format('YYYY-MM-DD');
  eventData.categories = event.categories.map(cat => cat.label).toString();
  eventData.location_place_id = event.location.placeId;
  eventData.location_name = event.location.name;
  eventData.location_latitude = event.location.lat;
  eventData.location_longitude = event.location.lng;
  return eventData;
}

export function postNewEvent(event) {
  const eventData = formatEventDataforAPI(event);
  const fullUrl = API_URL.concat(EVENT_URL);
  const response = $.ajax({
    url: fullUrl,
    jsonp: false,
    type: 'POST',
    data: eventData,
    success: (data) => {
      return data;
    },
    error: (xhr, status, err) => {
      console.error(fullUrl, status, err);
    },
  });
  return response;
}

export function getAllEvents(saveEventList, latitude, longitude, radius) {
  const fullUrl = API_URL.concat(EVENT_URL);
  $.ajax({
    url: fullUrl,
    type: 'GET',
    data: {
      location_latitude: latitude,
      location_longitude: longitude,
      location_radius: radius,
    },
    dataType: 'json',
    success: (data) => {
      const eventList = data.events.map((event) => {
        return formatAPIEventData(event);
      });
      console.log(data);
      return saveEventList(eventList);
    },
    error: (xhr, status, err) => {
      console.log(' /events GET was not successful.');
      console.error(fullUrl, status, err);
    },
  });
}

export function getAllCategories(saveCatList) {
  const fullUrl = API_URL.concat(CATEGORY_URL);
  $.ajax({
    url: fullUrl,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      const catList = data.categories;
      return saveCatList(catList);
    },
    error: (xhr, status, err) => {
      console.log(' /categories GET was not successful.');
      console.error(fullUrl, status, err);
    },
  });
}

// TODO: not entirely sure whether this works or if we even need it
export function getAllUsers() {
  const fullUrl = API_URL.concat(USERS_URL);
  $.ajax({
    url: fullUrl,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      return data;
      // const userList = data.users;
      // return saveUserList(userList);
    },
    error: (xhr, status, err) => {
      console.log(' /users GET was not successful.');
      console.error(fullUrl, status, err);
    },
  });
}

export function getUserByPassword(saveUserList, userPassword) {
  const fullUrl = API_URL.concat(USERS_URL).concat(userPassword);
  $.ajax({
    url: fullUrl,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      const userList = data.users;
      return saveUserList(userList);
      // console.log('data');
      // console.log(data);
      // return data;
    },
    error: (xhr, status, err) => {
      console.log(' /user GET was not successful.');
      console.error(fullUrl, status, err);
    },
  });
}

export function postFbToken(token) {
  const tokenData = {};
  tokenData.access_token = token.accessToken;
  const fullUrl = API_URL.concat(AUTH_URL);
  const response = $.ajax({
    url: fullUrl,
    jsonp: false,
    type: 'POST',
    data: tokenData,
    success: (data) => {
      return data;
    },
    error: (xhr, status, err) => {
      console.error(fullUrl, status, err);
    },
  });
  return response;
}
