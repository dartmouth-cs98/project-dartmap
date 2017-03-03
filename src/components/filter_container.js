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
  }

  onDateChange = (selectedDate) => {
    this.setState({ selectedDate });
    const filters = Object.assign({}, this.state, { selectedDate });
    this.applyFilters(filters);
  }

  onTimeChange = (selectedTime) => {
    this.setState({ selectedTime });
    const filters = Object.assign({}, this.state, { selectedTime });
    this.applyFilters(filters);
  }

  onCategoryChange = (selectedCategories) => {
    this.setState({ selectedCategories });
    const filters = Object.assign({}, this.state);
    filters.selectedCategories = selectedCategories;
    this.applyFilters(filters);
  }

  applyFilters = (filters) => {
    console.log('applying filters');
    this.props.filterEvents(filters);
  }

  render() {
    return (
      <div id="filter-container">
        <CategoryFilter onCategoryChange={this.onCategoryChange} catList={this.props.catList} />
        <DateFilter onDateChange={this.onDateChange} dateBarData={this.props.dateBarData} />
        <TimeFilter onTimeChange={this.onTimeChange} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    events: state.events.all,
    lat: state.user.latitude,
    lng: state.user.longitude,
    catList: state.events.catList,
    dateBarData: state.events.dateBarData,
  }
);

export default connect(mapStateToProps, { filterEvents })(FilterContainer);
