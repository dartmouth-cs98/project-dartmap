// add_event_page_3.js
import React, { Component } from 'react';
import ReactUIDropdown from 'react-ui-dropdown';


class AddEventPage4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = ['category'].map((data) => {
      return <div key={data} className="error-msg"> The {data} of the event is required. </div>;
    });
  }

  handleBack(event) {
    const data = {
      category: this.state.category,
      currentPage: this.props.currentPage - 1,
    };
    this.props.handleData(data);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.category) {
      const data = {
        category: this.state.category,
        currentPage: this.props.currentPage + 1,
      };
      this.props.handleData(data);
    }
  }
  render() {
    const categoryErrorMessage = (this.state.category === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const icons = [
      {
        id: 1,
        title: 'Academic',
        image: './../../../icon_set_1/academic.png',
      },
      {
        id: 2,
        title: 'Art',
        image: './../../../icon_set_1/art.png',
      },
      {
        id: 3,
        title: 'Sports',
        image: './../../../icon_set_1/game.png',
      },
      {
        id: 4,
        title: 'Performance',
        image: './../../../icon_set_1/music.png',
      },
      {
        id: 5,
        title: 'Lecture',
        image: './../../../icon_set_1/talk.png',
      },
      {
        id: 6,
        title: 'Greek Life',
        image: './../../../icon_set_2/party.png',
      },
      {
        id: 7,
        title: 'Free food',
        image: './../../../icon_set_2/food.png',
      },
    ];
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        {categoryErrorMessage}
        <h2>Select event category:*</h2>
        <ReactUIDropdown
          label="Select all the relevant categories"
          placeholder="e.g. Academic"
          initialItems={icons}
          onChange={event => this.setState({ value: event.target.value })}
        />
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
            className={(!this.state.category) ? 'invalid-nxt-btn add-event-btn nxt-btn' : 'nxt-btn add-event-btn'}
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage4;
