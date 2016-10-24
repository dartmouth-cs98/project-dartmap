// dartmap-api.js
// This file contains all the functions used to interact with the dartmap backend api.
import $ from 'jquery';

const API_URL = 'http://0.0.0.0:5000/';
const POST_URL = 'submitevent/';

function postNewEvent(eventData) {
  const fullUrl = API_URL.concat(POST_URL);
  $.ajax({
    url: fullUrl,
    jsonp: false,
    type: 'POST',
    data: eventData,
    success: function(data) {
      console.log('SUCCESS!!!!!!');
      console.log(data);
    }.bind(this),
    error: function(xhr, status, err) {
      console.log(status);
      console.error(fullUrl, status, err);
    }.bind(this),
  });
}


export default postNewEvent;
