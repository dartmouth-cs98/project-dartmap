// filter_container.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DateFilter from './filters/date_filter';
import TimeFilter from './filters/time_filter';
import CategoryFilter from './filters/category_filter';
// import ApplyFilterButton from './apply_filter_button';

import { filterEvents } from '../actions';
import createDateData from '../helpers/date-data-helper';

class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      selectedTime: null,
      selectedCategories: [],
    };
    this.dateBarData = createDateData();
    this.applyFilters = this.applyFilters.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.shouldApplyFiltersInitial = true;
  }
  onDateChange(selectedDate) {
    this.setState({ selectedDate });
    const filters = Object.assign({}, this.state, { selectedDate });
    this.applyFilters(filters);
  }
  onTimeChange(selectedTime) {
    this.setState({ selectedTime });
    const filters = Object.assign({}, this.state, { selectedTime });
    this.applyFilters(filters);
  }
  onCategoryChange(selectedCategories) {
    this.setState({ selectedCategories });
    const filters = Object.assign({}, this.state, { selectedCategories });
    this.applyFilters(filters);
  }
  applyFilters(filters) {
    this.props.filterEvents(filters,
      this.props.categoriesList, this.dateBarData);
  }
  render() {
    // ensures that the filters are applied when the page first loads
    if (this.props.events && this.shouldApplyFiltersInitial) {
      this.applyFilters(this.state);
      this.shouldApplyFiltersInitial = false;
    }
    return (
      <div id="filter-container">
        <DateFilter onDateChange={this.onDateChange} dateBarData={this.dateBarData} />
        <br />
        <br />
        <TimeFilter onTimeChange={this.onTimeChange} />
        <br />
        <CategoryFilter onCategoryChange={this.onCategoryChange} categoriesList={this.props.categoriesList} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    events: state.events.all,
  }
);

export default connect(mapStateToProps, { filterEvents })(FilterContainer);
