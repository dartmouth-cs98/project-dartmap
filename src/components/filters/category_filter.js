// category_filter.js
/*
  Filters by category
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';

const CATEGORIES = [
  { label: 'Academic', value: 'Academic' },
  { label: 'Art', value: 'Art' },
  { label: 'Sports', value: 'Sports' },
  { label: 'Performance', value: 'Performance' },
  { label: 'Lecture', value: 'Lecture' },
  { label: 'Greek Life', value: 'Greek Life' },
  { label: 'Free Food', value: 'Free Food' },
];


class CategoryFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: CATEGORIES,
    };
    this.handleChange = this.handleChange.bind(this);
    this.initialSetDefault = true;
  }


  handleChange(value) {
    this.setState({ value });
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
    this.props.onCategoryChange(obj);
  }

  render() {
    const dropdownValues = CATEGORIES;
    return (
      <div className="add-event-form" style={{ height: '70px' }}>
        <div className="add-event-fields">
          <Select multi simpleValue
            options={dropdownValues}
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Enter Categories to find Events"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    catList: state.events.catList,
  }
);

export default connect(mapStateToProps, null)(CategoryFilter);
