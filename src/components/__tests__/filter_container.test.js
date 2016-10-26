// filter_container.test.js

import React from 'react';
import { shallow } from 'enzyme';
import FilterContainer from '../filter_container';

it('FilterContainer renders without errors', () => {
  // Render an FilterContainer
  const shallowPrototype = shallow(
    <FilterContainer />
  );
});
