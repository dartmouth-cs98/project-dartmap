// dartmap-api.js
// This file contains all the functions used to interact with the dartmap backend api.
import $ from 'jquery';
import moment from 'moment';

const API_URL = 'https://dartmapapi.herokuapp.com/api/';
const EVENT_URL = 'events/';

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

  return newEvent;
}

/**
 * formatEventDataforAPI() returns an event formatted to work with the front-end
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
  if (event.location.id) {
    eventData.location_id = event.location.id;
  } else {
    eventData.location_name = event.location.name;
    eventData.location_latitude = event.location.latitude;
    eventData.location_longitude = event.location.longitude;
  }
  return eventData;
}

export function postNewEvent(event) {
  const eventData = formatEventDataforAPI(event);
  console.log(event);
  console.log(eventData);
  const fullUrl = API_URL.concat(EVENT_URL);
  const response = $.ajax({
    url: fullUrl,
    jsonp: false,
    type: 'POST',
    data: eventData,
    success: (data) => {
      console.log('SUCCESS!!!!!!');
      console.log(data);
      return data;
    },
    error: (xhr, status, err) => {
      console.error(fullUrl, status, err);
    },
  });
  return response;
}

export function getAllEvents(saveEventList) {
  const fullUrl = API_URL.concat(EVENT_URL);
  $.ajax({
    url: fullUrl,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log(' /events GET was successful! ');
      console.log(data);
      const eventList = data.events.map((event) => {
        return formatAPIEventData(event);
      });
      return saveEventList(eventList);
    },
    error: (xhr, status, err) => {
      console.log(' /events GET was not successful.');
      console.error(fullUrl, status, err);
    },
  });
}
