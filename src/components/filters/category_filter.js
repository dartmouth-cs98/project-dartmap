// category_filter.js
/*
  Filters by category
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Popover, Checkbox } from 'material-ui';

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

const styles = {
  block: {
    maxWidth: 500,
  },
  checkbox: {
    marginBottom: 16,
  },
};

class CategoryFilter extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      checked: CATEGORIES,
      checked_boolean: DEFAULT_CATEGORIES,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onCategoryChange = props.onCategoryChange;
    this.initialSetDefault = true;
    this.dropdownValues = [];
  }


  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  handleChange(event) {

    const val = event.target.value;
    console.log(val);
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
    console.log(cat_filters)
    this.onCategoryChange(cat_filters);

  }

  render() {

    if (!this.props.openCategoryFilter) {
      return (
        <form>
      <div className="multiselect">
        <div className="selectBox" onClick={this.props.openFilter}>
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
        <div className="selectBox" onClick={this.props.openFilter}>
          <select>
            <option>Filter by Category</option>
          </select>
          <div className="overSelect"></div>
        </div>
        <Popover
          open={this.props.openCategoryFilter}
          anchorEl={this.props.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.props.openFilter}
        >
        <div style={styles.block}>
        <Checkbox 
          label="Academic"
          style={styles.checkbox}
          onCheck={this.handleChange}
          checked={this.state.checked_boolean[0]}
          value="Academic"
          id="Academic"
          />

        <Checkbox 
          label="Art"
          style={styles.checkbox}
          onCheck={this.handleChange}
          checked={this.state.checked_boolean[1]}
          value="Art"
          id="Art"
          />

        <Checkbox 
          label="Sports"
          style={styles.checkbox}
          onCheck={this.handleChange}
          checked={this.state.checked_boolean[2]}
          value="Sports"
          id="Sports"
          />

        <Checkbox 
          label="Performance"
          style={styles.checkbox}
          onCheck={this.handleChange}
          checked={this.state.checked_boolean[3]}
          value="Performance"
          id="Performance"
          />

        <Checkbox 
          label="Lecture"
          style={styles.checkbox}
          onCheck={this.handleChange}
          checked={this.state.checked_boolean[4]}
          value="Lecture"
          id="Lecture"
          />

        <Checkbox 
          label="Greek Life"
          style={styles.checkbox}
          onCheck={this.handleChange}
          checked={this.state.checked_boolean[5]}
          value="Greek Life"
          id="Greek Life"
          />

        <Checkbox 
          label="Free Food"
          style={styles.checkbox}
          onCheck={this.handleChange}
          checked={this.state.checked_boolean[6]}
          value="Free Food"
          id="Free Food"
          />

        <Checkbox 
          label="All Categories"
          style={styles.checkbox}
          onCheck={this.handleChange}
          checked={this.state.checked_boolean[7]}
          value="All Categories"
          id="All Categories"
          />

          </div>

        </Popover>
          
      </div>
    </form>

    );

  }
}

export default CategoryFilter;
