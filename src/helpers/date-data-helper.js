// date-data-helper.js

/*
 * creates the date data object based on today's date
 * date data object: {0: Date(), 1: today.getDate()+1, ..., 6: today.getDate()+6, 7: today.getDate()+14}
 */
function createDateData() {
  const today = new Date();
  var obj = {};
  var i;
  var newDate;
  // iterate over the week and add in each day
  for (i = 0; i < 7; i += 1) {
    newDate = new Date();
    newDate.setDate(today.getDate() + i);
    obj[i] = newDate;
  }
  // add in the day that is two weeks from now
  newDate = new Date();
  newDate.setDate(today.getDate() + 14);
  obj[7] = newDate;
  return obj;
}

export default createDateData;
