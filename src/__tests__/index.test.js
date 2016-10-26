// index.test.js

import React from 'react';
// import ReactDOM from 'react-dom';
import App from '../index';
import ReactTestUtils from 'react-addons-test-utils';

it('App renders without errors', () => {
  // Render an App
  const renderer = ReactTestUtils.createRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe('div');
});
