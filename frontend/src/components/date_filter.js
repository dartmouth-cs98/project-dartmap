// date_filter.js
import React from 'react';
require('rc-slider/assets/index.css');
import Rcslider from 'rc-slider';
// var Rcslider = require('rc-slider');

var labelIndex = [0,1,2,3,4,5,6,7]
var labelTitle = ["zero","one","one","one","one","one","one"]

var obj = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h' };

function log(value) {
  console.log(value);
}

const DateFilter = (props) => {
  return (
    <Rcslider marks={{0:'today',1:'monday',2:'tuesday',3:'wednesday',4:'thursday',5:'friday',6:'saturday',7:'next 2 weeks'}} min={0} max={7} allowCross={false} range dots step={1} defaultValue={[0, 4]} onAfterChange={log} />
  );
};


export default DateFilter;
