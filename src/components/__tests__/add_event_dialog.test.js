// add_event_dialog.test.js

import React from 'react';
import { shallow } from 'enzyme';
import AddEventDialog from '../add_event_dialog';

it('AddEventDialog renders without errors', () => {
  // Render an AddEventDialog
  const shallowPrototype = shallow(
    <AddEventDialog />
  );
});
