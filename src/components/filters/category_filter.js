// category_filter.js
/*
  Filters by category
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategoryFilter extends Component {

  constructor(props) {
    super(props);
    this.state = { checked: [] };
    this.handleChange = this.handleChange.bind(this);
    this.onCategoryChange = props.onCategoryChange;
    this.initialSetDefault = true;
  }
  componentWillUpdate() {
    if (this.props.catList && this.initialSetDefault) {
      // set the default "checked" to be true for every category
      const checked = [];
      let i;
      for (i = 0; i <= this.props.catList.length; i += 1) {
        checked.push(i.toString());
      }
      this.setState({ checked });
      this.initialSetDefault = false;
    }
  }

  handleChange(event) {
    const val = event.target.value;
    let checked = this.state.checked.slice(); // copy

    // the array of checked categories to send, e.g. [obj, obj, obj]
    const categoryArray = [];

    if (checked.includes(val)) {
      checked.splice(checked.indexOf(val), 1);
      // if a different box is being unchecked and box 0 is checked
      if ((checked.includes('0'))) {
        document.getElementById('c0').checked = false;
        checked.splice(checked.indexOf('0'), 1);
      }
    } else {
      checked.push(val);
      // if the all categories button is selected
      if (val === '0') {
        checked = ['0'];
        // check every box
        this.props.catList.map((cat) => {
          const cID = `c${cat.id}`; // c1, c2, etc...
          checked.push((cat.id).toString());
          document.getElementById(cID).checked = true;
          return 0;
        });
      }
    }

    this.setState({ checked });

    // convert checked strings to ints and add each category to categoryArray
    let c, n;
    for (c in checked) {
      if (checked[c]) {
        n = parseInt(checked[c], 10);
        if (n > 0) {
          categoryArray.push(this.props.catList[n - 1]);
        }
      }
    }
    // categoryArray.sort();

    this.onCategoryChange(categoryArray);
  }


  render() {
    if (!this.props.catList || this.props.catList.length === 0) {
      return <div className="hidden" />;
    }
    const boxes = this.props.catList.map((cat) => {
      const cID = `c${cat.id}`; // c1, c2, etc...
      return (
        <div key={cID} className="segmented-control">
          <input
            type="checkbox"
            id={cID}
            name={cID}
            value={(cat.id).toString()}
            onChange={this.handleChange}
            defaultChecked
          />
          <label htmlFor={cID} data-value={cat.name}>{cat.name}</label>
        </div>
      );
    });

    return (
      <div className="category-filter section-inner">
        <div className="segmented-control">
          <input
            type="checkbox"
            id="c0"
            name="c0"
            value="0"
            onChange={this.handleChange}
            defaultChecked
          />
          <label htmlFor="c0" data-value={'All categories'}>
            All categories
          </label>
        </div>
        {boxes}
        <br />
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
