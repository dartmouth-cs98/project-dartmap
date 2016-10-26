// event_list.test.js

import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../event_list';

it('EventList renders without errors', () => {
  // Render an EventList
  const shallowPrototype = shallow(
    <EventList />
  );
});
