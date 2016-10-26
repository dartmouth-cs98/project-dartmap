// add_event_page_2.test.js

import React from 'react';
import { shallow } from 'enzyme';
import AddEventPage2 from '../add_event_page_2';

it('AddEventPage2 renders without errors', () => {
  // Render an AddEventPage2
  const shallowPrototype = shallow(
    <AddEventPage2 />
  );
});
