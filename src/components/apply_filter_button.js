// apply_filter_button.js
import React from 'react';

const ApplyFilterButton = (props) => {
  return (
    <button type="button" id="filter-btn" onClick={() => props.applyFilters()}>Apply</button>
  );
};

export default ApplyFilterButton;
