// category-filters-helper.js


// takes two arrays of categories
// if any single category is the same in both lists, returns true
// otherwise (if no categories are shared), returns false
function compareCategoryLists(categories1, categories2) {
  let c1, c2;
  // iterate through each category in categories1
  for (c1 = 0; c1 < categories1.length; c1 += 1) {
    // iterate through each category in categories2
    for (c2 = 0; c2 < categories2.length; c2 += 1) {
      // if they match
      console.log(categories1[c1].id, categories2[c2].id);
      if (categories1[c1].id === categories2[c2].id) {
        return true;
      }
    }
  }
  return false;
}


function filterCategories(filters, categoriesList, eventList) {
  const filterCategs = filters.selectedCategories;
  const filteredEvents = [];

  // for each event in eventList
  let i;
  for (i = 0; i < eventList.length; i += 1) {
    const event = eventList[i];
    // get the categories the event is tagged with
    const eventCategs = event.categories;
    // skip an event if it is not tagged with any categories, and...
    // if any one of the event's categories (eventCategs) is the same as any one of the selected categories (filterCategs)
    if ((eventCategs != null) && (compareCategoryLists(eventCategs, filterCategs))) {
      // add that event to the filtered event list
      filteredEvents.push(event);
    }
  }

  return filteredEvents;
}


export default filterCategories;
export { filterCategories };
