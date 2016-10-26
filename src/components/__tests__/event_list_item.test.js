// event_list_item.test.js

import React from 'react';
import { shallow } from 'enzyme';
import EventListItem from '../event_list_item';

it('EventListItem renders without errors', () => {
  // Render an EventListItem
  const eListItem = shallow(
    <EventListItem />
  );
});
