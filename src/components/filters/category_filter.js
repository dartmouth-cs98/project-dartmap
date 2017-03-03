// category_filter.js
/*
  Filters by category
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

// List of categories
const CATEGORIES = [
  'Academic',
  'Art',
  'Sports',
  'Performance',
  'Lecture',
  'Greek Life',
  'Free Food',
  'All Categories',
]

// Default to all categories
const DEFAULT_CATEGORIES = [true,true,true,true,true,true,true,true]


class CategoryFilter extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      checked: CATEGORIES,
      expanded: false,
      checked_boolean: DEFAULT_CATEGORIES,
    }
    this.handleChange = this.handleChange.bind(this);
    this.showCheckboxes = this.showCheckboxes.bind(this);
    this.onCategoryChange = props.onCategoryChange;
    this.initialSetDefault = true;
    this.dropdownValues = [];
  }


  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  handleChange(event) {

    const val = event.target.value;
    let checked = this.state.checked.slice(); // copy
    let checked_boolean = this.state.checked_boolean.slice();

    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
      checked_boolean[CATEGORIES.indexOf(val)]=false;
      if (checked.includes('All Categories')) {
        document.getElementById('All Categories').checked = false;
        checked.splice(checked.indexOf('All Categories'), 1);
        checked_boolean[7]=false;
      }
    } else {
      checked.push(val);
      checked_boolean[CATEGORIES.indexOf(val)]=true;
      if (val === 'All Categories') {
        // check every box
        document.getElementById('Academic').checked = true;
        document.getElementById('Art').checked = true;
        document.getElementById('Sports').checked = true;
        document.getElementById('Performance').checked = true;
        document.getElementById('Lecture').checked = true;
        document.getElementById('Greek Life').checked = true;
        document.getElementById('Free Food').checked = true;
        checked = CATEGORIES;
        checked_boolean = DEFAULT_CATEGORIES;
      }
    }
    this.setState({ checked });
    this.setState({ checked_boolean });

    var cat_filters = [];
    for (var i = 0; i < checked.length; ++i) {
      if (checked[i] != undefined) {
        var single_cat = {};
        var id;
        if (checked[i] === "Academic") id = 1;
        if (checked[i] === "Art") id = 2;
        if (checked[i] === "Sports") id = 3;
        if (checked[i] === "Performance") id = 4;
        if (checked[i] === "Lecture") id = 5;
        if (checked[i] === "Greek Life") id = 6;
        if (checked[i] === "Free Food") id = 7;
        if (checked[i] === "All Categories") break;
        single_cat['id'] = id;
        single_cat['name'] = checked[i]; 
        cat_filters.push(single_cat);
      }
      this.setState({ categories: this.dropdownValues });
      this.props.onCategoryChange(this.dropdownValues);
      this.initialSetDefault = false;
    }
    this.onCategoryChange(cat_filters);

  }

  showCheckboxes() {
    if (!this.state.expanded) {
      this.setState({ expanded : true });
    } else {
      this.setState({ expanded : false });
    }
    console.log(this.state.checked);
}

  render() {

    if (!this.state.expanded) {
      return (
        <form>
      <div className="multiselect">
        <div className="selectBox" onClick={this.showCheckboxes}>
          <select>
            <option>Filter by Category</option>
          </select>
          <div className="overSelect"></div>
        </div>
      </div>
    </form>
        );
      }
    return (
     <form>
      <div className="multiselect">
        <div className="selectBox" onClick={this.showCheckboxes}>
          <select>
            <option>Filter by Category</option>
          </select>
          <div className="overSelect"></div>
        </div>
        <div className="checkboxes-dropdown" id="checkboxes">

        <div >
          <label htmlFor="Academic">
          <input type="checkbox" id="Academic" name="Academic" value="Academic"
          onChange={this.handleChange} checked={this.state.checked_boolean[0]} 
          data-value="Academic" />     Academic</label>
        </div>

        <div >
        <label htmlFor="Art">
          <input type="checkbox" id="Art" name="Art" value="Art"
          onChange={this.handleChange} checked={this.state.checked_boolean[1]} 
           data-value="Art" />     Art</label>
        </div>

        <div >
        <label htmlFor="Sports">
          <input type="checkbox" id="Sports" name="Sports" value="Sports"
          onChange={this.handleChange} checked={this.state.checked_boolean[2]} 
           data-value="Sports" />     Sports</label>
        </div>

        <div >
        <label htmlFor="Performance" >
          <input type="checkbox" id="Performance" name="Performance" value="Performance"
          onChange={this.handleChange} checked={this.state.checked_boolean[3]} 
          data-value="Performance" />     Performance</label>
        </div>

        <div >
        <label htmlFor="Lecture">
          <input type="checkbox" id="Lecture" name="Lecture" value="Lecture"
          onChange={this.handleChange} checked={this.state.checked_boolean[4]} 
           data-value="Lecture" />     Lecture</label>
        </div>

        <div >
        <label htmlFor="Greek Life">
          <input type="checkbox" id="Greek Life" name="Greek Life" value="Greek Life"
          onChange={this.handleChange} checked={this.state.checked_boolean[5]} 
           data-value="Greek Life" />     Greek Life</label>
        </div>

        <div >
        <label htmlFor="Free Food">
          <input type="checkbox" id="Free Food" name="Free Food" value="Free Food"
          onChange={this.handleChange} checked={this.state.checked_boolean[6]} 
           data-value="Free Food" />     Free Food</label>
        </div>

        <div >
        <label htmlFor="All Categories">
          <input type="checkbox" id="All Categories" name="All Categories" value="All Categories"
          onChange={this.handleChange} checked={this.state.checked_boolean[7]} 
           data-value="All Categories" />     All Categories</label>
        </div>
          
        </div>
      </div>
    </form>

    );

  }
}

export default CategoryFilter;
