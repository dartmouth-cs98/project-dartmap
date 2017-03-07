// google-maps.js

let gMaps = (window.google && window.google.maps);

const loadGoogleApi = () => {
  if (!window.google) {
    const scriptTag = document.getElementsByTagName('script')[0];
    if (document.getElementById('google-maps')) return;
    const js = document.createElement('script');
    js.id = 'google-maps';
    js.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBiWgQfyoDdvwJR-x8o06wV-jbXhKrOQNo&libraries=places';
    scriptTag.parentNode.insertBefore(js, scriptTag);
  }
};

const createMap = (mapHTML, options) => {
  gMaps = gMaps || (window.google && window.google.maps);
  const map = new gMaps.Map(mapHTML, options);
  return map;
};

const createMarker = (map, location, icon) => {
  gMaps = gMaps || (window.google && window.google.maps);
  const marker = new gMaps.Marker({
    map,
    icon,
    position: location,
  });
  return marker;
};

const createInfoWindow = (map, marker, name) => {
  gMaps = gMaps || (window.google && window.google.maps);
  const infoWindow = new gMaps.InfoWindow();
  infoWindow.setContent(name);
  infoWindow.open(map, marker);
  return infoWindow;
};

const createSearchBox = (map, searchHTML) => {
  gMaps = gMaps || (window.google && window.google.maps);
  const textBox = new gMaps.places.Autocomplete(searchHTML);
  textBox.bindTo('bounds', map);
  return textBox;
};

const getLocationFromZipcode = (zipcode, dispatch, success, error) => {
  gMaps = gMaps || (window.google && window.google.maps);
  const geocoder = new gMaps.Geocoder();
  geocoder.geocode({ address: zipcode }, (results, status) => {
    if (status === gMaps.GeocoderStatus.OK) {
      dispatch({
        type: success,
        payload: {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
        },
      });
    } else {
      dispatch({ type: error, payload: { status } });
    }
  });
};

export default createMap;
export { createMap, createMarker, createInfoWindow, createSearchBox };
export { getLocationFromZipcode };
export { loadGoogleApi };
