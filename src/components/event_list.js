// event_list.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
// import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';

import EventListItem from './event_list_item';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.isSameDay = false;
    this.prevDate = null;
    this.state = { searchString: '', open: true };
    this.styles = {
      drawerStyle: {
        height: '100%',
        top: 0,
        position: 'absolute',
        overflow: 'visible',
      },
      dateDisplay: {
        backgroundColor: this.props.muiTheme.palette.primary2Color,
      },
      arrow: {
        backgroundColor: this.props.muiTheme.palette.primary1Color,
      },
    };
  }

  handleChange = (e) => {
    this.setState({ searchString: e.target.value });
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    this.eventItems = [];
    let arrowurl = '';
    if (this.state.open) {
      arrowurl = 'https://s9.postimg.org/yf27eupf3/leftarrow.png';
    } else {
      arrowurl = 'https://s11.postimg.org/crw1d3377/rightarrow.png';
    }

    if (this.props.events && this.props.events.length > 0) {
      // FOR EACH EVENT
      for (let i = 0; i < this.props.events.length; i += 1) {
        const event = this.props.events[i];
        const eListItem = [<EventListItem
          event={event}
          selectedLocation={this.props.selectedLocation}
          key={event.id}
          showBalloon={this.props.showBalloon}
          onEventListItemClick={this.props.onEventListItemClick}
        />];
        if (i >= 1) {
          this.isSameDay = this.prevDate.isSame(event.date);
        }
        if (i === 0 || (i >= 1 && !this.isSameDay)) {
          this.eventItems.push(
            <div className="date-display" key={'date'.concat(i)} style={this.styles.dateDisplay}>
              {event.date.format('dddd,  MMMM D')}
            </div>
          );
        }
        this.eventItems.push(eListItem);
        this.prevDate = event.date;
      }

      // SEARCHING
      const searchString = this.state.searchString.trim().toLowerCase();
      if (searchString.length > 0) {
        console.log(this.eventItems);
        this.eventItems = this.eventItems.filter(i => ((i.constructor !== Array)
          ? null : i[0].props.event.name.toLowerCase().match(searchString)));
      }

      // Case of matching events (i.e. if there are events to be displayed)
      if (this.eventItems || this.eventItems.length > 0) {
        return (
          <div>
            <div className="side-drawer">
              <Drawer open={this.state.open} containerStyle={this.styles.drawerStyle}>
                <div className="evl-arrow" onClick={this.handleToggle}>
                  <img
                    style={this.styles.arrow}
                    className={this.state.open ? 'arrow' : 'arrow closed-arrow'}
                    src={arrowurl} alt="arrow"
                  />
                </div>
                <div className="search-bar-box">
                  <input id="search-bar" type="text" value={this.state.searchString}
                    onChange={this.handleChange} placeholder="  Search MappIt"
                  />
                </div>
                <div id="event-menu">
                  <div id="event-list">
                    {this.eventItems}
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        );
      }
    } else {
      // Case of no matching events (i.e. if there are no events to be displayed)
      return (
        <div id="event-none">
          <div className="side-drawer">
            <Drawer open={this.state.open} containerStyle={this.styles.drawerStyle}>
              <div className="evl-arrow" onClick={this.handleToggle}>
                <img
                  style={this.styles.arrow}
                  className="arrow"
                  src={arrowurl} alt="arrow"
                />
              </div>
              <div className="search-bar-box">
                <input id="search-bar" type="text" value={this.state.searchString}
                  onChange={this.handleChange} placeholder="  Search MappIt"
                />
              </div>
              <div id="event-list">
                <text className="warning-msg">
                  No Matching Events. <br />
                  Please Try Again.
                </text>
              </div>
            </Drawer>
          </div>
        </div>
      );
    }
    return <div className="hidden" />;
  }
}

const mapStateToProps = state => (
  {
    isUserLoggedIn: state.user.loggedIn,
    events: state.events.filteredEventList,
  }
);

export default connect(mapStateToProps, null)(muiThemeable()(EventList));
