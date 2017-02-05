// google-places-api.js

import $ from 'jquery';

const API_KEY = 'AIzaSyAmi90D8Iw5A51foVbt3m87kmuN7FSN_ek';
const GPLACES_URL = 'https://maps.googleapis.com/maps/api/place/';

const nearbyMapSearch = (service, location) => {
  console.log('I will search for nearby locations');
  // googleMapsClient.placesNearby({
  //   location,
  // }, (err, response) => {
  //   if (!err) {
  //     console.log(response.json.results);
  //   }
  // });
};

const textSearch = (service, text, location) => {
  console.log('I will search based on text input');
  // googleMapsClient.places({
  //   query: text,
  //   location,
  // }, (err, response) => {
  //   if (!err) {
  //     console.log(response.json.results);
  //   }
  // });
};

const autoCompleteSearch = (service, text, location) => {
  console.log('I will search for things that will complete the text');
  // googleMapsClient.placesAutoComplete({
  //   input: text,
  //   location,
  // }, (err, response) => {
  //   if (!err) {
  //     console.log(response.json.results);
  //   }
  // });
};

const addLocation = (location) => {
  const postData = {
    location: {
      lat: location.latitude,
      lng: location.longitude,
    },
    accuracy: 50,
    name: location.name,
    types: ['other'],
  };
  const fullURL = GPLACES_URL.concat('add/json?key=').concat(API_KEY);
  const response = $.ajax({
    url: fullURL,
    type: 'POST',
    data: postData,
    success: (data) => {
      console.log('location successfully added');
      console.log(data);
      return data;
    },
    error: (xhr, status, err) => {
      console.error(fullURL, status, err);
    },
  });
  return response;
};


// export default initiateService;
export { nearbyMapSearch, textSearch, autoCompleteSearch };
export default addLocation;
