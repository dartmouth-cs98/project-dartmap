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
      openTimeFilter: false,
      openDateFilter: false,
      openCategoryFilter: false,
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
    this.props.filterEvents(filters);
  }

  toggleTimeFilter = (event) => {
    this.setState({
      openTimeFilter: !this.state.openTimeFilter,
      openDateFilter: false,
      openCategoryFilter: false,
      anchorEl: event.currentTarget,
    });
  }

  toggleCategoryFilter = (event) => {
    this.setState({
      openTimeFilter: false,
      openDateFilter: false,
      openCategoryFilter: !this.state.openCategoryFilter,
      anchorEl: event.currentTarget,
    });
  }

  toggleDateFilter = (event) => {
    this.setState({
      openTimeFilter: false,
      openDateFilter: !this.state.openDateFilter,
      openCategoryFilter: false,
      anchorEl: event.currentTarget,
    });
  }

  render() {
    return (
      <div id="filter-container">
        <div className="filter">
          <TimeFilter openTimeFilter={this.state.openTimeFilter}
            openFilter={this.toggleTimeFilter}
            onTimeChange={this.onTimeChange}
            anchorEl={this.state.anchorEl}
          />
        </div>
        <div className="filter">
          <DateFilter dateFilter={this.state.dateFilter}
            onDateChange={this.onDateChange}
            dateBarData={this.props.dateBarData}
            openFilter={this.toggleDateFilter}
            openDateFilter={this.state.openDateFilter}
            anchorEl={this.state.anchorEl}
          />
        </div>
        <div className="filter">
          <CategoryFilter onCategoryChange={this.onCategoryChange}
            catList={this.props.catList}
            openFilter={this.toggleCategoryFilter}
            openCategoryFilter={this.state.openCategoryFilter}
            anchorEl={this.state.anchorEl}
          />
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
    catList: state.events.catList,
    dateBarData: state.events.dateBarData,
  }
);

export default connect(mapStateToProps, { filterEvents })(FilterContainer);
