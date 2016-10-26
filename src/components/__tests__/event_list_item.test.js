// event_list_item.test.js

import React from 'react';
import { shallow } from 'enzyme';
import EventListItem from '../event_list_item';
import FakeAppStateData from '../../__mocks__/fake_app_state_data';

it('EventListItem renders without errors', () => {
  // Render an EventListItem
  const eListItem = shallow(
    <EventListItem event={FakeAppStateData.eventList[0]} />
  );
});
