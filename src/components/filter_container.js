// filter_container.js
import React, { Component } from 'react';

import DateFilter from './filters/date_filter';
import TimeFilter from './filters/time_filter';
import CategoryFilter from './filters/category_filter';
import ApplyFilterButton from './apply_filter_button';

class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      selectedTime: null,
      selectedCategories: [],
    };
    this.applyFilters = this.applyFilters.bind(this);
    // this.filterEvents = this.filterEvents.bind(this);
  }
  applyFilters(event) {
    // TODO: once we know that all the filters work, we can delete these console.log() prompts
    console.log('applying the filters:');
    console.log(this.state);
    this.props.onApplyFilter(this.state);
    // this.props.filterEvents();
  }
  // filterEvents(event) {
  //   // TODO: once we know that all the filters work, we can delete these console.log() prompts
  //   console.log('entered');
  // }
  render() {
    return (
      <div id="filter-container">
        <DateFilter onDateChange={selectedDate => this.setState({ selectedDate })} dateBarData={this.props.dateBarData} />
        <br />
        <br />
        <TimeFilter onTimeChange={selectedTime => this.setState({ selectedTime })} timeBarData={this.props.timeBarData} />
        <br />
        <CategoryFilter onCategoryChange={selectedCategories => this.setState({ selectedCategories })} />
        <ApplyFilterButton applyFilters={this.applyFilters} />
      </div>
    );
  }
}

export default FilterContainer;
