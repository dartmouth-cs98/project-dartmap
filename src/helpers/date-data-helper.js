// date-data-helper.js

/*
 * creates the date data object based on today's date
 * date data object: {0: Date(), 1: today.getDate()+1, ..., 6: today.getDate()+6, 7: today.getDate()+14}
 */
function createDateData( ) {
  const today = new Date();
  const obj = {};
  let i;
  // iterate over the week and add in each day
  for (i = 0; i < 7; i += 1) {
    const newDate = new Date(today.getDate() + i);
    obj[i] = newDate;
  }
  // add in the day that is two weeks from now
  const newDate = new Date(today.getDate() + 14);
  obj[7] = newDate;
  return obj;
}

export default createDateData;
