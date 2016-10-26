// map_container.test.js

import React from 'react';
import { shallow } from 'enzyme';
import MapContainer from '../map_container';

it('MapContainer renders without errors', () => {
  // Render an MapContainer
  const shallowPrototype = shallow(
    <MapContainer />
  );
});
