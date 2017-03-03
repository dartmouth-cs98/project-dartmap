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
    this.handleChange = this.handleChange.bind(this);
    this.initialSetDefault = true;
    this.dropdownValues = [];
  }


  handleChange(value) {
    this.setState({ categories }, this.updateFilteredEventList);
    const cats = value.split(',');
    console.log(cats.length);
    console.log('categories ', CATEGORIES);
    const obj = [];
    for (let i = 0; i < cats.length; ++i) {
      if (cats[i] != undefined) {
        const single_obj = {};
        let id;
        if (cats[i] === 'Academic') id = 1;
        if (cats[i] === 'Art') id = 2;
        if (cats[i] === 'Sports') id = 3;
        if (cats[i] === 'Performance') id = 4;
        if (cats[i] === 'Lecture') id = 5;
        if (cats[i] === 'Greek Life') id = 6;
        if (cats[i] === 'Free Food') id = 7;
        single_obj.id = id;
        single_obj.name = cats[i];
        obj.push(single_obj);
      }
    }
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
