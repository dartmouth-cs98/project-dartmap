// add_event_page_3.test.js

import React from 'react';
import { shallow } from 'enzyme';
import AddEventPage3 from '../add_event_page_3';

it('AddEventPage3 renders without errors', () => {
  // Render an AddEventPage3
  const shallowPrototype = shallow(
    <AddEventPage3 />
  );
});
