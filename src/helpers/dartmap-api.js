// dartmap-api.js
// This file contains all the functions used to interact with the dartmap backend api.
import $ from 'jquery';
import moment from 'moment';

const API_URL = 'https://dartmapapi.herokuapp.com/api/';
const EVENT_URL = 'events/';


const tempAPIData = [
  {
    id: '1',
    name: 'test event 1',
    location: {
      id: 1,
      name: 'collis',
      lat: 43.702732,
      long: -72.290032,
    },
    description: 'description1',
  },
  {
    id: '2',
    name: 'test event 2',
    location: {
      id: 2,
      lat: 43.704252,
      long: -72.294903,
    },
    description: 'description2',
  },
  {
    id: '3',
    name: 'test event 3',
    location: {
      id: 3,
      lat: 43.702141,
      long: -72.282574,
    },
    description: 'description3',
  },
];

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
  newEvent.description = event.description;
  newEvent.location_string = event.location_string;
  newEvent.date = moment(event.date, 'YYYY-MM-DD');
  newEvent.start_time = moment(event.start_time, 'HH:mm');
  newEvent.end_time = moment(event.end_time, 'HH:mm');
  // location data
  newEvent.location_id = event.location.id;
  newEvent.lat = event.location.lat;
  newEvent.lng = event.location.long;
  newEvent.location_name = event.location.name;

  return newEvent;
}

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
  // const fullUrl = API_URL.concat(EVENT_URL);
  // $.ajax({
  //   url: fullUrl,
  //   type: 'GET',
  //   dataType: 'json',
  //   success: (data) => {
  //     console.log(' /events GET was successful! ');
  //     console.log(data.results);
  //     const eventList = data.results.map((event) => {
  //       return formatAPIEventData(event);
  //     });
  //     return saveEventList(eventList);
  //     // return data.results;
  //   },
  //   error: (xhr, status, err) => {
  //     console.log(' /events GET was not successful.');
  //     console.error(fullUrl, status, err);
  //   },
  // });
  //
  // The next two lines are used to test formatAPIEventData
  // TODO: remove them once the API GET function works
  const eventList = tempAPIData.map((event) => {
    return formatAPIEventData(event);
  });
  return saveEventList(eventList);
}
