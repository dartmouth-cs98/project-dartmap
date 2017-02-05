// location_modal.js
import React from 'react';

import LocationDialog from './location_dialog';

const LocationModal = (props) => {
  const show = props.showModal;
  if (show) {
    return <LocationDialog submitModalData={props.submitModalData} />;
  } else {
    return null;
  }
};

export default LocationModal;
