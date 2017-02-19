// filter_container.js
import React, { Component } from 'react';

import DateFilter from './filters/date_filter';
import TimeFilter from './filters/time_filter';
import CategoryFilter from './filters/category_filter';
// import ApplyFilterButton from './apply_filter_button';

class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      selectedTime: null,
      selectedCategories: [],
    };
    this.applyFilters = this.applyFilters.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.shouldApplyFiltersInitial = true;
  }
  onDateChange(selectedDate) {
    this.setState({ selectedDate });
    this.applyFilters();
  }
  onTimeChange(selectedTime) {
    this.setState({ selectedTime });
    this.applyFilters();
  }
  onCategoryChange(selectedCategories) {
    this.setState({ selectedCategories });
    this.applyFilters();
  }
  applyFilters(event) {
    // TODO: this is a hack that needs to be fixed in the future. Delays the setState call
    setTimeout(() => {
      this.props.onApplyFilter(this.state);
    }, 500);
    // this.props.filterEvents();
  }
  render() {
    // ensures that the filters are applied when the page first loads
    if (this.shouldApplyFiltersInitial) {
      this.applyFilters();
      this.shouldApplyFiltersInitial = false;
    }
    return (
      <div id="filter-container">
        <DateFilter onDateChange={this.onDateChange} dateBarData={this.props.dateBarData} />
        <CategoryFilter onCategoryChange={this.onCategoryChange} categoriesList={this.props.categoriesList} />
        <TimeFilter onTimeChange={this.onTimeChange} />
      </div>
    );
  }
}

export default FilterContainer;
