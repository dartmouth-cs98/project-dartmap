// filter_container.js
import React from 'react';

import DateFilter from './date_filter';
import TimeFilter from './time_filter';
import CategoryFilter from './category_filter';
import ApplyFilterButton from './apply_filter_button';

const FilterContainer = (props) => {
  return (
    <div id="filter-container">
      <p>I am the container that holds all the filter options.</p>
      <DateFilter />
      <TimeFilter />
      <CategoryFilter />
      <ApplyFilterButton />
    </div>
  );
};

export default FilterContainer;
