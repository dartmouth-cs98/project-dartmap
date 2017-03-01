// add_event_page_4.js
import React, { Component } from 'react';
import Select from 'react-select';
import RaisedButton from 'material-ui/RaisedButton';


class AddEventPage4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = <div className="error-msg"> One category is required. </div>;
  }

  handleBack(event) {
    const data = {
      categories: this.state.categories,
      currentPage: this.props.currentPage - 1,
    };
    this.props.handleData(data);
  }

  handleSubmit(event) {
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
    const categoryErrorMessage = (this.state.categories === []) ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const dropdownValues = this.props.catList.map((cat) => {
      return { label: cat.name, value: cat.id };
    });
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
          <RaisedButton 
            label="Back"
            type="button"
            onClick={(e) => { this.handleBack(e); }}
            className="back-btn"
          />
          <RaisedButton 
            label="Next"
            primary={true}
            type="submit"
            disabled={(!this.state.categories)}
            className="nxt-btn"
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage4;
