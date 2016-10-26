// event_list.test.js

import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../event_list';
import FakeAppStateData from '../../__mocks__/fake_app_state_data';

describe('EventList', () => {
  it('renders without errors when given a list of events', () => {
    // Render an EventList
    const shallowPrototype = shallow(
      <EventList events={FakeAppStateData.eventList} />
    );
  });
});

