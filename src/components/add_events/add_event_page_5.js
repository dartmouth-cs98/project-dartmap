// add_event_page_5.js
import React, { Component } from 'react';
import AddEventIconBtn from './add_event_icon_btn';
import UploadMultiImages from '../upload_multi_images';

class AddEventPage5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: props.data.icon,
      image_url: props.data.image_url,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.updateImageURL = this.updateImageURL.bind(this);
    this.hiddenErrorMessage = <div className="hidden" />;
    this.visibleErrorMessages = <div className="error-msg"> The event icon is required. </div>;
    this.iconURLs = [
      {
        id: 1,
        name: 'Academic',
        url: 'https://s23.postimg.org/8i1v2t8cb/academic.png',
      },
      {
        id: 2,
        name: 'Art',
        url: 'https://s27.postimg.org/bwiklsppf/art.png',
      },
      {
        id: 3,
        name: 'Sports',
        url: 'https://s30.postimg.org/bxmzys9gh/game.png',
      },
      {
        id: 4,
        name: 'Performance',
        url: 'https://s24.postimg.org/o84drbk3p/music.png',
      },
      {
        id: 5,
        name: 'Lecture',
        url: 'https://s23.postimg.org/ji4pb0yyz/talk.png',
      },
      {
        id: 6,
        name: 'Free Food',
        url: 'https://s27.postimg.org/3t1ikm5ar/food.png',
      },
      {
        id: 7,
        name: 'games',
        url: 'https://s27.postimg.org/61lunzpg3/games.png',
      },
      {
        id: 8,
        name: 'music2',
        url: 'https://s29.postimg.org/k3jw3sw53/music.png',
      },
      {
        id: 9,
        name: 'openmeeting',
        url: 'https://s30.postimg.org/77dhr4t6p/openmeeting.png',
      },
      {
        id: 10,
        name: 'Greek Life',
        url: 'https://s28.postimg.org/cdfv0i8ot/party.png',
      },
      {
        id: 11,
        name: 'Unknown',
        url: 'https://s27.postimg.org/ws3spwi9f/unknown.png',
      },
    ];
  }

  handleBack(event) {
    event.preventDefault();
    const data = {
      icon: this.state.icon,
      currentPage: this.props.currentPage - 1,
      image_url: this.state.image_url,
    };
    this.props.handleData(data);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.icon) {
      const data = {
        icon: this.state.icon,
        currentPage: this.props.currentPage + 1,
        image_url: this.state.image_url,
      };
      this.props.handleData(data);
    }
  }

  updateImageURL(url) {
    let updatedurl = null;
    const defaulturl = 'https://s27.postimg.org/o2c50l3fn/default.png';
    const imageurl = this.state.image_url.toString();
    if (imageurl.localeCompare(defaulturl) === 0) {
      updatedurl = url;
    } else {
      updatedurl = `${this.state.image_url}, ${url}`;
    }
    this.setState({
      image_url: updatedurl,
    });
  }

  render() {
    const iconBtns = this.iconURLs.map((obj) => {
      return (
        <AddEventIconBtn key={obj.id} icon={obj} selected={this.state.icon} handleSelect={iconData => this.setState({ icon: iconData })} />
      );
    });
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <div className="add-event-fields">
          <h2>Select event map icon:*</h2>
          <div className="icon-select">
            {iconBtns}
          </div>
        </div>
        <div className="add-event-fields">
          <h2>Select event image:</h2>
          <UploadMultiImages updateImageURL={this.updateImageURL} />
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
            className={(!this.state.icon) ? 'invalid-nxt-btn add-event-btn nxt-btn' : 'nxt-btn add-event-btn'}
          />
        </div>
      </form>
    );
  }
}

export default AddEventPage5;
