// filter_container.js
import React, { Component } from 'react';

import DateFilter from './date_filter';
import TimeFilter from './time_filter';
import CategoryFilter from './category_filter';
import ApplyFilterButton from './apply_filter_button';

class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      selectedTime: null,
      selectedCategories: [],
    };
  }
  onDateChange(event) {
    this.setState({ selectedDate: event.target.value });
  }
  onTimeChange(event) {
    this.setState({ selectedTime: event.target.value });
  }
  onCategoryChange(event) {
    this.setState({ selectedCategories: event.target.value });
  }
  applyFilters(event) {
    console.log('applying the filters:');
    console.log(this.state);
    this.props.onApplyFilter(this.state);
  }
  render() {
    return (
      <div id="filter-container">
        <p>I am the container that holds all the filter options.</p>
        <DateFilter onDateChange={this.onDateChange} />
        <TimeFilter onTimeChange={this.onTimeChange} />
        <CategoryFilter onCategoryChange={this.onCategoryChange} />
        <ApplyFilterButton applyFilters={this.applyFilters} />
      </div>
    );
  }
}

export default FilterContainer;
