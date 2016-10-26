// add_event_page_1.test.js

import React from 'react';
import { shallow } from 'enzyme';
import AddEventPage1 from '../add_event_page_1';

it('AddEventPage1 renders without errors', () => {
  // Render an AddEventPage1
  const shallowPrototype = shallow(
    <AddEventPage1 />
  );
});
