/*
  Filters by category
*/

// category_filter.js
import React, { Component } from 'react';
import Select from 'react-select';

class CategoryFilter extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      categories: null,
      value: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onCategoryChange = props.onCategoryChange;
  }

  handleChange(value) {
    this.setState({ value });
    this.onCategoryChange(this.state.value);
  }


  render() {
    const dropdownValues = this.props.categoriesList.map((cat) => {
      return { label: cat.name, value: cat.id };
    });
    return (
      <div className="add-event-form" style={{ color: '#008000', height: '70px' }}>
         <div className="add-event-fields">
          <Select multi joinValues
            options={dropdownValues}
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Filter Events by Categories"
          />
        </div>
      </div>
    );
  }
}

export default CategoryFilter;
