/*
  Filters by category
*/

// category_filter.js
import React, { Component } from 'react';

// categories that are checked by default
// TODO: this should eventually be made more elegant than just having 100 default category boxes
const DEFAULT_CATEGORIES = [];
let j;
for (j = 0; j < 100; j += 1) {
  DEFAULT_CATEGORIES.push(true);
}

class CategoryFilter extends Component {

  constructor(props) {
    super(props);

    // set which categories (strings) should be checked by default
    const defaultCategories = [];
    for (let i = 0; i < DEFAULT_CATEGORIES.length; i += 1) {
      if (DEFAULT_CATEGORIES[i]) defaultCategories.push(i.toString());
    }

    this.state = { checked: defaultCategories };
    this.handleChange = this.handleChange.bind(this);
    this.onCategoryChange = props.onCategoryChange;
  }
  componentWillMount() {
    // set the default "checked" to be true for every category
    const checked = [];
    let i;
    for (i = 0; i <= this.props.categoriesList.length; i += 1) {
      checked.push(i.toString());
    }
    this.setState({ checked });
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
        this.props.categoriesList.map((cat) => {
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
          categoryArray.push(this.props.categoriesList[n - 1]);
        }
      }
    }
    // categoryArray.sort();

    this.onCategoryChange(categoryArray);
  }


  render() {
    let boxes;
    if (this.props.categoriesList.length === 0) {
      return <div className="hidden" />;
    } else {
      boxes = this.props.categoriesList.map((cat) => {
        const cID = `c${cat.id}`; // c1, c2, etc...
        return (
          <div key={cID} className="segmented-control">
            <input type="checkbox" id={cID} name={cID} value={(cat.id).toString()} onChange={this.handleChange} defaultChecked />
            <label htmlFor={cID} data-value={cat.name}>{cat.name}</label>
          </div>
        );
      });
    }

    return (
      <div className="category-filter section-inner" style={{ color: '#008000', height: '30px' }}>
        <div className="segmented-control">
          <input type="checkbox" id="c0" name="c0" value="0" onChange={this.handleChange} defaultChecked />
          <label htmlFor="c0" data-value={'All categories'}>All categories</label>
        </div>
        {boxes}
        <br />
      </div>
    );
  }
}

export default CategoryFilter;
