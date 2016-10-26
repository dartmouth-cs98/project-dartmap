// apply_filter_button.test.js

import React from 'react';
import { shallow } from 'enzyme';
import ApplyFilterButton from '../apply_filter_button';

it('ApplyFilterButton renders without errors', () => {
  // Render an ApplyFilterButton
  const shallowPrototype = shallow(
    <ApplyFilterButton />
  );
});
