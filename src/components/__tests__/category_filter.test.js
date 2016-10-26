// category_filter.test.js

import React from 'react';
import { shallow } from 'enzyme';
import CategoryFilter from '../category_filter';

it('CategoryFilter renders without errors', () => {
  // Render an CategoryFilter
  const shallowPrototype = shallow(
    <CategoryFilter />
  );
});
