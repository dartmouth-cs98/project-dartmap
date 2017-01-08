// add_event_page_slider.js
/*
  Filters by page within the "add event" dialog
*/

import React from 'react';
import Rcslider from 'rc-slider';

const PageSlider = (props) => {
  return (
    <div className="page-slider">
      <Rcslider tipFormatter={null} min={0} max={props.numPages} dots step={1} value={props.currentPage} defaultValue={0} />
    </div>
  );
};

export default PageSlider;
