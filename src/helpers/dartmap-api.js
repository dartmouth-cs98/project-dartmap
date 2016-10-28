// dartmap-api.js
// This file contains all the functions used to interact with the dartmap backend api.
import $ from 'jquery';

const API_URL = 'https://dartmapapi.herokuapp.com/api/';
const EVENT_URL = 'events/';

export function postNewEvent(eventData) {
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
      console.log(data.results);
      saveEventList(data.results);
      return;
      // return data.results;
    },
    error: (xhr, status, err) => {
      console.log(' /events GET was not successful.');
      console.error(fullUrl, status, err);
    },
  });
}
