// index.test.js

import React from 'react';
import { shallow } from 'enzyme';
import App from '../index';

it('App renders without errors', () => {
  // Render an App
  const shallowPrototype = shallow(
    <App />
  );
});
