// map_balloon_event.js

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { darkBlack, blue700 } from 'material-ui/styles/colors';
import { clearBalloons } from '../../actions';

class MapBalloonEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.event,
      categoryString: this.props.event.categories.map((cat) => {
        return cat.name;
      }).join(', '),
    };
  }

  isClicked = () => {
    this.props.clearBalloons();
  }

  render() {
    const listItemStyle = {

    };
    return (
      <ListItem
        className="map-event-list"
        value={this.props.num}
        primaryText={this.state.event.name + ' @ ' + this.state.event.start_time.format('h:mm A')}
        secondaryText={this.state.event.description}
        secondaryTextLines={1}
        leftAvatar={<Avatar src={this.state.event.icon_url} />}
        key={'outer-text'.concat(this.props.num)}
        nestedItems={[
          <ListItem
            className="map-event-list"
            value={this.props.num}
            containerElement={<Link to={'/events/'.concat(this.state.event.id)} />}
            secondaryText={
              <text>
                <span style={{ color: darkBlack }}>Description</span>
                <div className="popup-description">{this.state.event.description}</div>
                <span style={{ color: darkBlack }}>Organizer</span>
                <div className="popup-description">{this.state.event.organizer}</div>
                <span style={{ color: darkBlack }}>Categories</span>
                <div className="popup-description">{this.state.categoryString}</div><br />
                <span style={{ color: blue700 }}>Click to view more information</span>
              </text>}
            style={listItemStyle}
            key={'nested-info'.concat(this.props.num)}
            onClick={this.isClicked}
          />,
        ]}
      />
    );
  }
}

const mapStateToProps = state => (
  { }
);
const mapDispatchToProps = { clearBalloons };

export default connect(mapStateToProps, mapDispatchToProps)(MapBalloonEvent);
