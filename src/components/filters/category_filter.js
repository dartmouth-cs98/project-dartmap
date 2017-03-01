// category_filter.js
/*
  Filters by category
*/

import React, { Component } from 'react';
import Select from 'react-select';

class CategoryFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
    this.initialSetDefault = true;
    this.dropdownValues = [];
  }
  componentWillUpdate = () => {
    if (this.props.catList && this.initialSetDefault) {
      for (let i = 0; i < this.props.catList.length; i += 1) {
        const cat = this.props.catList[i];
        this.dropdownValues.push({ label: cat.label, value: cat.value });
      }
      this.setState({ categories: this.dropdownValues });
      this.props.onCategoryChange(this.dropdownValues);
      this.initialSetDefault = false;
    }
  }

  updateFilteredEventList = () => {
    this.props.onCategoryChange(this.state.categories);
  }

  handleChange = (categories) => {
    this.setState({ categories }, this.updateFilteredEventList);
  }

  render() {
    console.log(this.state.categories);
    return (
      <div className="add-event-form" style={{ height: '70px' }}>
        <div className="add-event-fields">
          <Select multi joinValues
            options={this.dropdownValues}
            value={this.state.categories}
            onChange={this.handleChange}
            placeholder="Enter Categories to find Events"
          />
        </div>
      </div>
    );
  }
}

export default CategoryFilter;
