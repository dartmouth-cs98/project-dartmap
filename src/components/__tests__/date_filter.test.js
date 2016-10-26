// date_filter.test.js

import React from 'react';
import { shallow } from 'enzyme';
import DateFilter from '../date_filter';
import createDateData from '../../helpers/date-data-helper';

it('DateFilter renders without errors', () => {
  const dateBarData = createDateData();
  // Render an DateFilter
  const shallowPrototype = shallow(
    <DateFilter dateBarData={dateBarData} />
  );
});
