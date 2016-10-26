// nav_bar.test.js

import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../nav_bar';

it('NavBar renders without errors', () => {
  // Render an NavBar
  const shallowPrototype = shallow(
    <NavBar />
  );
});
