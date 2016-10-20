// apply_filter_button.js
import React from 'react';

const ApplyFilterButton = (props) => {
  return (
    <div id="filter-btn" onClick={() => props.applyFilters()}>I am the Apply Filter button.</div>
  );
};

export default ApplyFilterButton;
