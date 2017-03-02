// category_filter.js
/*
  Filters by category
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

// List of categories
const CATEGORIES = [
  'Academic',
  'Art',
  'Sports',
  'Performance',
  'Lecture',
  'Greek Life',
  'Free Food',
]

// Default to all categories
const DEFAULT_CATEGORIES = [true,true,true,true,true,true,true]

class CategoryFilter extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      checked: CATEGORIES,
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
    let checked = this.state.checked.slice(); // copy
    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
    } else {
      checked.push(val);
    }
    this.setState({ checked });

    var cat_filters = [];
    for (var i = 0; i < checked.length; ++i) {
      if (checked[i] != undefined) {
        var single_cat = {};
        var id;
        if (checked[i] === "Academic") id = 1;
        if (checked[i] === "Art") id = 2;
        if (checked[i] === "Sports") id = 3;
        if (checked[i] === "Performance") id = 4;
        if (checked[i] === "Lecture") id = 5;
        if (checked[i] === "Greek Life") id = 6;
        if (checked[i] === "Free Food") id = 7;
        single_cat['id'] = id;
        single_cat['name'] = checked[i]; 
        cat_filters.push(single_cat);
      }
    }
    console.log(cat_filters);
    this.onCategoryChange(cat_filters);
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

        <div >
          <input type="checkbox" id="Academic" name="Academic" value="Academic"
          onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[0]} />
          <label htmlFor="Academic" data-value="Academic">Academic</label>
        </div>

        <div >
          <input type="checkbox" id="Art" name="Art" value="Art"
          onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[1]} />
          <label htmlFor="Art" data-value="Art">Art</label>
        </div>

        <div >
          <input type="checkbox" id="Sports" name="Sports" value="Sports"
          onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[2]} />
          <label htmlFor="Sports" data-value="Sports">Sports</label>
        </div>

        <div >
          <input type="checkbox" id="Performance" name="Performance" value="Performance"
          onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[3]} />
          <label htmlFor="Performance" data-value="Performance">Performance</label>
        </div>

        <div >
          <input type="checkbox" id="Lecture" name="Lecture" value="Lecture"
          onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[4]} />
          <label htmlFor="Lecture" data-value="Lecture">Lecture</label>
        </div>

        <div >
          <input type="checkbox" id="Greek Life" name="Greek Life" value="Greek Life"
          onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[5]} />
          <label htmlFor="Greek Life" data-value="Greek Life">Greek Life</label>
        </div>

        <div >
          <input type="checkbox" id="Free Food" name="Free Food" value="Free Food"
          onChange={this.handleChange} defaultChecked={DEFAULT_CATEGORIES[6]} />
          <label htmlFor="Free Food" data-value="Free Food">Free Food</label>
        </div>
          
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
