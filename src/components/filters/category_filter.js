// category_filter.js
/*
  Filters by category
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Select from 'react-select';
import SelectBox from 'react-select-box-2';

// const CATEGORIES = [
//   { label: 'Academic', value: 'Academic'},
//   { label: 'Art', value: 'Art'},
//   { label: 'Sports', value: 'Sports'},
//   { label: 'Performance', value: 'Performance'},
//   { label: 'Lecture', value: 'Lecture'},
//   { label: 'Greek Life', value: 'Greek Life'},
//   { label: 'Free Food', value: 'Free Food'},
// ]

const CATEGORIES = [
  'Academic',
  'Art',
  'Sports',
  'Performance',
  'Lecture',
  'Greek Life',
  'Free Food',
]

class CategoryFilter extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      value: CATEGORIES,
      checked: [],
      expanded: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.showCheckboxes = this.showCheckboxes.bind(this);
    this.onCategoryChange = props.onCategoryChange;
    this.initialSetDefault = true;
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  handleChange(event) {

    const val = event.target.value;
    console.log('value',val);
    let checked = this.state.checked.slice(); // copy
    console.log(checked);

    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
    } else {
      checked.push(val);
    }

    console.log('after',checked);

    this.setState({ checked });

    // this.setState({ value });
    // var cats = value.split(",");
    // var obj = [];
    // for (var i = 0; i < cats.length; ++i) {
    //   if (cats[i] != undefined) {
    //     var single_obj = {};
    //     var id;
    //     if (cats[i] === "Academic") id = 1;
    //     if (cats[i] === "Art") id = 2;
    //     if (cats[i] === "Sports") id = 3;
    //     if (cats[i] === "Performance") id = 4;
    //     if (cats[i] === "Lecture") id = 5;
    //     if (cats[i] === "Greek Life") id = 6;
    //     if (cats[i] === "Free Food") id = 7;
    //     single_obj['id'] = id;
    //     single_obj['name'] = cats[i]; 
    //     obj.push(single_obj);
    //   }
    // }
    // console.log(obj);
    this.onCategoryChange({});
  }

  showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!this.state.expanded) {
      this.setState({ expanded : true });
    } else {
      this.setState({ expanded : false });
    }
}

  render() {
    if (!this.state.expanded) {
      return (
        <form>
      <div className="multiselect">
        <div className="selectBox" onClick={this.showCheckboxes}>
          <select>
            <option>Filter by Category</option>
          </select>
          <div className="overSelect"></div>
        </div>
      </div>
    </form>
        );
      }
    return (
     <form>
      <div className="multiselect">
        <div className="selectBox" onClick={this.showCheckboxes}>
          <select>
            <option>Filter by Category</option>
          </select>
          <div className="overSelect"></div>
        </div>
        <div className="checkboxes-dropdown" id="checkboxes">
          <label htmlFor="Academic">
            <input type="checkbox" id="Academic" />Academic</label>
          <label htmlFor="Art">
            <input type="checkbox" id="Art" />Art</label>
          <label htmlFor="Sports">
            <input type="checkbox" id="Sports" />Sports</label>
          <label htmlFor="Performance">
            <input type="checkbox" id="Performance" />Performance</label>
          <label htmlFor="Lecture">
            <input type="checkbox" id="Lecture" />Lecture</label>
          <label htmlFor="Greek Life">
            <input type="checkbox" id="Greek Life" />Greek Life</label>
          <label htmlFor="Free Food">
            <input type="checkbox" id="Free Food" />Free Food</label>  
        </div>
      </div>
    </form>

    );

  }
}

const mapStateToProps = state => (
  {
    catList: state.events.catList,
  }
);

export default connect(mapStateToProps, null)(CategoryFilter);
