// category_filter.js
/*
  Filters by category
*/

import React, { Component } from 'react';

import { Popover, Checkbox, RaisedButton } from 'material-ui';

// Default to all categories
const DEFAULT_CATEGORIES = [true, true, true, true, true, true, true, true];

class CategoryFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      checked_boolean: DEFAULT_CATEGORIES,
      allCategories: [],
    };
    this.setInitialDefault = true;
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }


  componentWillUpdate = () => {
    if (this.setInitialDefault && this.props.catList) {
      this.setInitialDefault = false;
      const catFilters = this.props.catList.map((cat) => {
        return { id: cat.value, name: cat.label };
      });
      this.props.onCategoryChange(catFilters);
      const checkedList = this.props.catList.map((cat) => { return cat.label; });
      checkedList.push('All Categories');
      this.setState({ checked: checkedList, allCategories: checkedList });
    }
  }

  handleChange = (event) => {
    const val = event.target.value;
    let checked = this.state.checked.slice(); // copy
    let checkedBoolean = this.state.checked_boolean.slice();
    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
      checkedBoolean[this.state.allCategories.indexOf(val)] = false;
      if (checked.includes('All Categories')) {
        checked.splice(checked.indexOf('All Categories'), 1);
        checkedBoolean[7] = false;
      }
    } else {
      checked.push(val);
      checkedBoolean[this.state.allCategories.indexOf(val)] = true;
      if (val === 'All Categories') {
        // check every box
        checked = this.state.allCategories;
        checkedBoolean = DEFAULT_CATEGORIES;
      }
    }

    const catFilters = [];
    for (let i = 0; i < checked.length; i += 1) {
      if (checked[i] !== undefined) {
        const singleCat = {};
        let id;
        if (checked[i] === 'Academic') id = 1;
        if (checked[i] === 'Art') id = 2;
        if (checked[i] === 'Sports') id = 3;
        if (checked[i] === 'Performance') id = 4;
        if (checked[i] === 'Lecture') id = 5;
        if (checked[i] === 'Greek Life') id = 6;
        if (checked[i] === 'Free Food') id = 7;
        if (checked[i] === 'All Categories') break;
        singleCat.id = id;
        singleCat.name = checked[i];
        catFilters.push(singleCat);
      }
    }
    this.setState({ checked, checked_boolean: checkedBoolean });
    this.props.onCategoryChange(catFilters);
  }

  render() {
    if (!this.props.openCategoryFilter) {
      return (
        <div className="filter">
          <div className="multiselect">
            <RaisedButton className="block" primary
              style={this.props.styles.buttonStyle}
              onTouchTap={this.props.openFilter}
              label="Filter by Category"
            />
          </div>
        </div>
      );
    }
    const checkBoxes = this.props.catList.map((category) => {
      return (
        <Checkbox
          label={category.label}
          onCheck={this.handleChange}
          checked={this.state.checked_boolean[category.value - 1]}
          value={category.label}
          id={category.label}
          key={category.value}
        />
      );
    });
    checkBoxes.push(
      <Checkbox
        label="All Categories"
        onCheck={this.handleChange}
        checked={this.state.checked_boolean[this.props.catList.length]}
        value="All Categories"
        id="All Categories"
        key={this.props.catList.length + 1}
      />
    );
    console.log(checkBoxes);

    return (
      <div className="filter">
        <div className="multiselect">
          <RaisedButton className="block" secondary
            style={this.props.styles.buttonStyle}
            onTouchTap={this.props.openFilter}
            label="Filter by Category"
          />
        </div>
        <Popover className="checkbox"
          style={this.props.styles.checkboxStyle}
          open={this.props.openCategoryFilter}
          anchorEl={this.props.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.props.openFilter}
        >
          {checkBoxes}
        </Popover>
      </div>
    );
  }
}

export default CategoryFilter;
