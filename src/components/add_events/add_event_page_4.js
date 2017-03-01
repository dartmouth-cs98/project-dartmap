// add_event_page_4.js
import React, { Component } from 'react';
import Select from 'react-select';


class AddEventPage4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = (
      <div className="error-msg"> One category is required. </div>
    );
    this.validNext = 'nxt-btn add-event-btn';
    this.invalidNext = 'invalid-nxt-btn add-event-btn nxt-btn';
  }

  handleBack = (event) => {
    const data = {
      categories: this.state.categories,
      currentPage: this.props.currentPage - 1,
    };
    this.props.handleData(data);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.categories) {
      const data = {
        categories: this.state.categories,
        currentPage: this.props.currentPage + 1,
      };
      this.props.handleData(data);
    }
  }
  render() {
    let categoryErrorMessage = this.hiddenErrorMessage;
    if (this.state.categories === []) {
      categoryErrorMessage = this.visibleErrorMessages[0];
    }
    const dropdownValues = this.props.catList || [];
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          {categoryErrorMessage}
          <h2>Select event categories</h2>
          <br />
          <Select multi joinValues
            options={dropdownValues}
            value={this.state.categories}
            onChange={categories => this.setState({ categories })}
          />
        </div>
        <div className="add-event-btns">
          <input
            type="button"
            value="Back"
            onClick={(e) => { this.handleBack(e); }}
            className="back-btn add-event-btn"
          />
          <input
            type="submit"
            value="Next"
            className={
              (!this.state.categories) ? this.invalidNext : this.validNext
            }
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage4;
