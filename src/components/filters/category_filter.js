/*
  Filters by category
*/

// category_filter.js
import React, { Component } from 'react';

// categories that are checked by default
const DEFAULT_CATEGORIES = [true, true, true, true, true, true, true, true];

class CategoryFilter extends Component {

  constructor(props) {
    super(props);

    // set which categories (strings) should be checked by default
    const defaultCategories = [];
    for (let i = 0; i < DEFAULT_CATEGORIES.length; i += 1) {
      if (DEFAULT_CATEGORIES[i]) defaultCategories.push(i.toString());
    }

    // // receives the dates data object passed down from index.js
    // const datesData = props.dateBarData;

    // // dictionary of date strings to be displayed onscreen
    // this.datesDataDisplay = convertDatesToDisplay(datesData);

    this.state = { checked: defaultCategories };
    this.handleChange = this.handleChange.bind(this);
    this.onCategoryChange = props.onCategoryChange;
  }

  handleChange(event) {
    console.log('this.state');
    console.log(this.state);
    const val = event.target.value;
    let checked = this.state.checked.slice(); // copy

    // the array of checked categories to send, e.g. [0, 1, 2, 5, 6]
    const categoryArray = [];

    console.log('vallllllllllll 1');
    console.log(val);
    console.log('checkedddddddd 1');
    console.log(checked);

    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
      // if a different box is being unchecked and box 7 is checked
      if ((checked.includes('0'))) {
        document.getElementById('c0').checked = false;
        checked.splice(checked.indexOf('0'), 1);
      }
    } else {
      checked.push(val);
      // if the next two weeks are selected
      if (val === '0') {
        // console.log('ENTERED');
        // check every box
        document.getElementById('c0').checked = true;
        document.getElementById('c1').checked = true;
        document.getElementById('c2').checked = true;
        document.getElementById('c3').checked = true;
        document.getElementById('c4').checked = true;
        document.getElementById('c5').checked = true;
        document.getElementById('c6').checked = true;
        checked = ['0', '1', '2', '3', '4', '5', '6', '7'];
      }
    }

    this.setState({ checked });

    // convert checked strings to ints and add them to categoryArray (sorted)
    let c, n;
    for (c in checked) {
      if (checked[c]) {
        n = parseInt(checked[c], 10);
        categoryArray.push(n);
      }
    }
    categoryArray.sort();

    this.onCategoryChange(categoryArray);

    console.log('vallllllllllll 2');
    console.log(val);
    console.log('checkedddddddd 2');
    console.log(checked);
  }


  render() {
    return (
      <div className="category-filter">
        <div><input type="checkbox" id="c0" value="0" onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[0]} /> all cats</div>
        <div><input type="checkbox" id="c1" value="1" onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[1]} /> cat1</div>
        <div><input type="checkbox" id="c2" value="2" onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[2]} /> cat2</div>
        <div><input type="checkbox" id="c3" value="3" onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[3]} /> cat3</div>
        <div><input type="checkbox" id="c4" value="4" onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[4]} /> cat4</div>
        <div><input type="checkbox" id="c5" value="5" onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[5]} /> cat5</div>
        <div><input type="checkbox" id="c6" value="6" onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[6]} /> cat6</div>
        <div><input type="checkbox" id="c7" value="7" onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[7]} /> cat7</div>
        <br />
      </div>
    );
  }
}

export default CategoryFilter;
