// add_event_page_5.js
import React, { Component } from 'react';
import Select from 'react-select';


class AddEventPage5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon_url: props.data.icon_url,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = <div className="error-msg"> The event icon is required. </div>;
  }

  handleBack(event) {
    const data = {
      icon_url: this.state.icon_url.value.toString(),
      currentPage: this.props.currentPage - 1,
    };
    this.props.handleData(data);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.icon_url) {
      const data = {
        icon_url: this.state.icon_url.value.toString(),
        currentPage: this.props.currentPage + 1,
      };
      this.props.handleData(data);
    }
  }
  render() {
    const iconErrorMessage = (this.state.icon_url === []) ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    const iconURLs = [
      {
        label: 'Academic',
        value: 'https://s23.postimg.org/8i1v2t8cb/academic.png',
      },
      {
        label: 'Art',
        value: 'https://s27.postimg.org/bwiklsppf/art.png',
      },
      {
        label: 'Sports',
        value: 'https://s30.postimg.org/bxmzys9gh/game.png',
      },
      {
        label: 'Performance',
        value: 'https://s24.postimg.org/o84drbk3p/music.png',
      },
      {
        label: 'Lecture',
        value: 'https://s23.postimg.org/ji4pb0yyz/talk.png',
      },
      {
        label: 'Free Food',
        value: 'https://s27.postimg.org/3t1ikm5ar/food.png',
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
        label: 'Greek Life',
        value: 'https://s28.postimg.org/cdfv0i8ot/party.png',
      },
    ];
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          {iconErrorMessage}
          <h2>Select event map icon:*</h2>
          <Select openOnFocus
            className="icon-select"
            options={iconURLs}
            value={this.state.icon_url}
            onChange={iconUrl => this.setState({ icon_url: iconUrl })}
            valueRenderer={(icon) => { return <img className="selected-icon" src={icon.value} alt={icon.label} />; }}
            optionRenderer={(option) => {
              return (
                <div className="icon-select-option">
                  <img src={option.value} alt={option.label} />
                </div>
              );
            }}
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
            className={(!this.state.icon_url) ? 'invalid-nxt-btn add-event-btn nxt-btn' : 'nxt-btn add-event-btn'}
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage5;