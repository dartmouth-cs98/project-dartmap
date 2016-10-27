// dartmap-api.js
// This file contains all the functions used to interact with the dartmap backend api.
import $ from 'jquery';

const API_URL = 'https://dartmapapi.herokuapp.com/api/';
const EVENT_URL = 'events/';

function postNewEvent(eventData) {
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
      console.log(status);
      console.error(fullUrl, status, err);
    },
  });
  return response;
}


export default postNewEvent;
