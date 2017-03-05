// event_list.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Drawer from 'material-ui/Drawer';
import ContentAdd from 'material-ui/svg-icons/content/add';


import EventListItem from './event_list_item';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.isSameDay = false;
    this.prevDate = null;
    this.state = { searchString: '' , open: true };
  }

  handleChange = (e) => {
    this.setState({ searchString: e.target.value });
  };

  handleToggle = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    this.eventItems = [];
    if(this.state.open){
      var arrowurl = "https://s22.postimg.org/7w3kbqdkx/leftarrow.png";
    }else{
      var arrowurl = "https://s27.postimg.org/4lgynq277/rightarrow.png";
    }

    if (this.props.events && this.props.events.length > 0) {
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
            <div className="date-display" key={'date'.concat(i)}>
              {event.date.format('dddd,  MMMM D')}
            </div>
          );
        }
        this.eventItems.push(eListItem);
        this.prevDate = event.date;
      }

      const searchString = this.state.searchString.trim().toLowerCase();
      if (searchString.length > 0) {
        console.log(this.eventItems);
        this.eventItems = this.eventItems.filter(i => ((i.constructor !== Array)
          ? null : i[0].props.event.name.toLowerCase().match(searchString)));
      }

      // Case of matching events.
      if (this.eventItems || this.eventItems.length > 0) {
        return (
            <div>
              <div className="side-drawer">
                <Drawer open={this.state.open} containerStyle={{ height: '5.5%', top: 0, width: '290px', position: 'absolute', overflow: 'hidden'}}>
                  <img className= "arrow" src={arrowurl} width="10%" onClick={this.handleToggle}/>
                </Drawer>
                <Drawer open={this.state.open} containerStyle={{ height: '100%', top: 0, position: 'absolute', overflow: 'hidden'}}>
                  <div className="search-bar-box">
                    <input id="search-bar" type="text" value={this.state.searchString}
                      onChange={this.handleChange} placeholder="Search here..."
                    />
                    <img src="https://api.icons8.com/download/c5c8b5ba35e008ea471e9a53c5fa74c03ef6e78c/iOS7/PNG/256/Very_Basic/search-256.png" width="10%" display="inline-block"/>
                  </div>
                  <div id="event-menu">
                    <div id="event-list">
                      {this.eventItems}
                    </div>
                  </div>
                </Drawer>
              </div>
              <div className="add-event-btn-container">
                <FloatingActionButton onClick={this.props.toggleAddEvent}>
                  <ContentAdd />
                </FloatingActionButton>
              </div>
            </div>
        );
      }
    } else {
    // Case of no matching events.
      return (
          <div id="event-none">
            <div className="side-drawer">
              <Drawer open={this.state.open} containerStyle={{ height: '5.5%', top: 0, width: '290px', position: 'absolute', overflow: 'hidden'}}>
                <img className= "arrow" src={arrowurl} width="10%" onClick={this.handleToggle}/>
              </Drawer>
              <Drawer open={this.state.open} containerStyle={{ height: '100%', top: 0, position: 'absolute', overflow: 'hidden'}}>
                <div className="search-bar-box">
                  <input id="search-bar" type="text" value={this.state.searchString}
                    onChange={this.handleChange} placeholder="Search here..."
                  />
                  <img src="https://api.icons8.com/download/c5c8b5ba35e008ea471e9a53c5fa74c03ef6e78c/iOS7/PNG/256/Very_Basic/search-256.png" width="10%" display="inline-block"/>
                </div>
                <div id="event-list">
                  <text className="warning-msg">
                    No Matching Events. <br />
                    Please Try Again.
                  </text>
                </div>
              </Drawer>
            </div>
            <div className="add-event-btn-container">
              <FloatingActionButton onClick={this.props.toggleAddEvent}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>
      );
    }
    return <div className="hidden" />;
  }
}

const mapStateToProps = state => (
  {
    events: state.events.filteredEventList,
  }
);

export default connect(mapStateToProps, null)(EventList);
