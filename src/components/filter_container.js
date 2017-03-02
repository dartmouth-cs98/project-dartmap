// filter_container.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DateFilter from './filters/date_filter';
import TimeFilter from './filters/time_filter';
import CategoryFilter from './filters/category_filter';
// import ApplyFilterButton from './apply_filter_button';

import { filterEvents } from '../actions';

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
    this.props.filterEvents(filters);
  }

  render() {
    return (
    <div id="filter-container">
    <div id="time-filter-container">
      <TimeFilter onTimeChange={this.onTimeChange} />
      </div>
    <div id="date-filter-container">
      <DateFilter onDateChange={this.onDateChange} 
      dateBarData={this.props.dateBarData} />
      </div>
    <div id="category-filter-container">
      <CategoryFilter onCategoryChange={this.onCategoryChange} 
      categoriesList={this.props.categoriesList} />
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => (
  {
    events: state.events.all,
    lat: state.user.latitude,
    lng: state.user.longitude,
  }
);

export default connect(mapStateToProps, { filterEvents })(FilterContainer);
