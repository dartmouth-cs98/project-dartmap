// map_balloon_event.js

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import { clearBalloons } from '../../actions';

const MapBalloonEvent = (props) => {
  const event = props.event;
  const categoryString = event.categories.map((cat) => {
    return cat.name;
  }).join(', ');
  const listItemStyle = {

  };

  return (
    <ListItem 
      value={props.num}
      primaryText={event.name + ' @ ' + event.start_time.format('h:mm A')}
      leftAvatar={<Avatar src={event.icon_url} />}
      key={'outer-text'.concat(props.num)}
      nestedItems={[
        <ListItem 
              value={props.num}
              primaryText='Description'
              secondaryText={event.description}
              key={'nested-description'.concat(props.num)}
              style={listItemStyle}
        />,
        <ListItem 
              value={props.num}
              primaryText='Organizer'
              secondaryText={event.organizer}
              key={'nested-organizer'.concat(props.num)}
              style={listItemStyle}
        />,
        <ListItem 
              value={props.num}
              primaryText='Categories'
              secondaryText={categoryString}
              key={'nested-categories'.concat(props.num)}
              style={listItemStyle}
        />,
        <ListItem 
              containerElement={<Link to={'/events/'.concat(event.id)} />}
              value={props.num}
              primaryText='Click to view more information'
              key={'nested-link'.concat(props.num)}
              style={listItemStyle}
              onClick={props.clearBalloons}
        />,
      ]}
    />
  );
};
const mapStateToProps = state => (
  { }
);
const mapDispatchToProps = { clearBalloons };

export default connect(mapStateToProps, mapDispatchToProps)(MapBalloonEvent);
