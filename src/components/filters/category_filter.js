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

    // console.log('props');
    // console.log(this.props);

    // set which categories (strings) should be checked by default
    const defaultCategories = [];
    for (let i = 0; i < DEFAULT_CATEGORIES.length; i += 1) {
      if (DEFAULT_CATEGORIES[i]) defaultCategories.push(i.toString());
    }

    // console.log('defaultCategories');
    // console.log(defaultCategories);

    this.state = { checked: defaultCategories };
    this.handleChange = this.handleChange.bind(this);
    this.onCategoryChange = props.onCategoryChange;
    this.firstTimeThrough = true;
  }

  handleChange(event) {
    console.log('this.state');
    console.log(this.state);
    const val = event.target.value;
    let checked = this.state.checked.slice(); // copy

    // the array of checked categories to send, e.g. [obj, obj, obj]
    const categoryArray = [];

    // console.log('vallllllllllll 1');
    // console.log(val);
    // console.log('checkedddddddd 1');
    // console.log(checked);

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

    // console.log('vallllllllllll 2');
    // console.log(val);
    // console.log('checkedddddddd 2');
    // console.log(checked);
  }


  render() {
    let boxes;
    if (this.props.categoriesList.length === 0) {
      return <div className="hidden" />;
    } else {
      // at the very beginning (happens once)
      if (this.firstTimeThrough) {
        // set the default "checked" to be true for every category
        const checked = [];
        let i;
        for (i = 0; i <= this.props.categoriesList.length; i += 1) {
          checked.push(i.toString());
        }
        this.setState({ checked });
        this.firstTimeThrough = false;
      }

      boxes = this.props.categoriesList.map((cat) => {
        const cID = `c${cat.id}`; // c1, c2, etc...
        return <div key={cat.id}><input type="checkbox" id={cID} value={(cat.id).toString()} onChange={this.handleChange} defaultChecked />{cat.name}</div>;
      });
    }

    return (
      <div className="category-filter">
        <div><input type="checkbox" id={'c0'} value={'0'} onChange={this.handleChange} defaultChecked />All categories</div>
        {boxes}
        <br />
      </div>
    );
  }
}

export default CategoryFilter;
