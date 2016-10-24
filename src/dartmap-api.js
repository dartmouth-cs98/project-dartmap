// dartmap-api.js
// This file contains all the functions used to interact with the dartmap backend api.
import $ from 'jquery';

const API_URL = 'http://localhost:5000/';
const POST_URL = 'submitevent/';

function postNewEvent(eventData) {
  const full_url = API_URL.concat(POST_URL);
  $.ajax({
    url: full_url,
    dataType: 'json',
    type: 'POST',
    data: eventData,
    success: function(data) {
      console.log('SUCCESS!!!!!!');
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
    }.bind(this),
  });
}


export default postNewEvent;
