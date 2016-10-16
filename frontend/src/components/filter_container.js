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
      selectedDate: 0,
      selectedTime: 0,
      selectedCategories: [],
    };
    this.applyFilters = this.applyFilters.bind(this);
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
        <DateFilter onDateChange={selectedDate => this.setState({ selectedDate })} />
        <TimeFilter onTimeChange={selectedTime => this.setState({ selectedTime })} />
        <CategoryFilter onCategoryChange={selectedCategories => this.setState({ selectedCategories })} />
        <ApplyFilterButton applyFilters={this.applyFilters} />
      </div>
    );
  }
}

export default FilterContainer;
