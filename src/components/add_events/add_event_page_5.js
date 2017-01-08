// add_event_page_5.js
import React, { Component } from 'react';
import Select from 'react-select';


class AddEventPage5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconUrl: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = <div className="error-msg"> The event icon is required. </div>;
    this.renderIcon = this.renderIcon.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  handleBack(event) {
    const data = {
      iconUrl: this.state.iconUrl,
      currentPage: this.props.currentPage - 1,
    };
    this.props.handleData(data);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.iconUrl) {
      const data = {
        categories: this.state.iconUrl,
        currentPage: this.props.currentPage + 1,
      };
      this.props.handleData(data);
    }
  }
  renderIcon(option) {
    console.log(this.state.iconUrl, option);
    return <img src={option.value} alt={option.label} />;
  }
  renderOption(option) {
    console.log(this.state.iconUrl, option);
    return (
      <div className="icon-select-option">
        <img src={option.value} alt={option.label} />
      </div>
    );
  }
  render() {
    const iconErrorMessage = (this.state.iconUrl === []) ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    // const catLabels = ['Academic', 'Art', 'Sports', 'Performance', 'Lecture', 'Greek Life', 'Free food'];
    const iconURLs = [
      {
        label: 'academic',
        value: '/icon_set_1/academic.png',
      },
      {
        label: 'art',
        value: '/icon_set_1/art.png',
      },
      {
        label: 'game',
        value: '/icon_set_1/game.png',
      },
      {
        label: 'music',
        value: '/icon_set_1/music.png',
      },
      {
        label: 'talk',
        value: '/icon_set_1/talk.png',
      },
      {
        label: 'food',
        value: '/icon_set_2/food.png',
      },
      {
        label: 'games',
        value: '/icon_set_2/games.png',
      },
      {
        label: 'music2',
        value: '/icon_set_2/music.png',
      },
      {
        label: 'openmeeting',
        value: '/icon_set_2/openmeeting.png',
      },
      {
        label: 'party',
        value: '/icon_set_2/party.png',
      },
    ];
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        {iconErrorMessage}
        <h2>Select event category:*</h2>
        <Select
          className="icon-select"
          options={iconURLs}
          value={this.state.iconUrl}
          onChange={iconUrl => this.setState({ iconUrl })}
          valueRenderer={this.renderIcon}
          optionRenderer={this.renderOption}
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
            className={(!this.state.iconUrl) ? 'invalid-nxt-btn add-event-btn nxt-btn' : 'nxt-btn add-event-btn'}
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage5;
