import React from 'react';
import moment from 'moment';

import { TextField, FlatButton, ListItem, Avatar, IconButton, IconMenu, MenuItem } from 'material-ui';
import { grey400 } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isEditing: false,
      isEditDialogOpen: false,
      isDeleteDialogOpen: false,
      isExpandComment: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isEditing !== nextProps.isEditing) {
      return false;
    }
    return true;
  }

  getTime = () => {
    let time;
    time = moment.utc(this.props.time).toDate();
    time = moment(time).format('YYYY-MM-DD h:mm A');
    return time;
  }

  trackEdit = (e) => {
    this.setState({
      text: e.target.value,
    });
  }

  handleEdit = (e) => {
    e.preventDefault();
    const data = {};
    data.content = this.state.text;
    this.props.onCommentEdit(this.props.id, data);
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.onCommentDelete(this.props.id);
  }

  toggleEditing = (e) => {
    e.preventDefault();
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleOpenEdit = (e) => {
    e.preventDefault();
    this.setState({ isEditDialogOpen: !this.state.isEditDialogOpen });
  }

  handleOpenDelete = (e) => {
    e.preventDefault();
    this.setState({ isDeleteDialogOpen: !this.state.isDeleteDialogOpen });
  }

  expandComment = (e) => {
    if (this.props.text.length > 130) {
      this.setState({ isExpandComment: !this.state.isExpandComment });
    }
  }

  render() {
    // const actions = [
    //   <FlatButton
    //     label="Cancel"
    //     primary
    //     onTouchTap={this.handleOpenDelete}
    //   />,
    //   <FlatButton
    //     label="Discard"
    //     primary
    //     onTouchTap={this.handleDelete}
    //   />,
    // ];

    const iconButtonElement = (
      <IconButton
        touch
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <div className={this.props.enable_edit ? '' : 'hidden'}>
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem
            onTouchTap={this.toggleEditing}
          >
            Edit
          </MenuItem>
          <MenuItem
            onTouchTap={this.handleDelete}
          >
            Delete
          </MenuItem>
        </IconMenu>
      </div>
    );
    const styles = {
      text: {
        width: '80%',
        zIndex: 2,
        fontSize: 17,
      },
      secondary: {
        height: 40,
      },
      secondaryExpanded: {
        height: 55,
      },
    };

    if (this.state.isExpandComment) {
      return (
        <ListItem
          leftAvatar={<Avatar src={this.props.image} />}
          rightIconButton={rightIconMenu}
          primaryText={
            <span style={{ fontSize: '12px', color: 'grey' }}><b>{this.props.author}</b> posted {this.getTime()}</span>
          }
          secondaryText={
            <div style={styles.secondaryExpanded}>
              <div>
                <div className={this.state.isEditing ? '' : 'hidden'}>
                  <TextField style={styles.text} underlineShow defaultValue={this.props.text} onChange={this.trackEdit} />
                  <FlatButton
                    label="Cancel"
                    primary
                    onTouchTap={this.toggleEditing}
                    className="pull-right"
                  />
                  <FlatButton
                    label="Submit"
                    primary
                    onTouchTap={this.handleEdit}
                    className="pull-right"
                  />
                </div>
                <div className={this.state.isEditing ? 'hidden' : ''}>
                  <p style={{ lineHeight: '20px', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '16px', fontSize: '17px', color: 'black' }} >{this.props.text}</p>
                </div>
              </div>
            </div>
          }
          onTouchTap={this.expandComment}
          secondaryTextLines={2}
        />
      );
    } else {
      return (
        <ListItem
          leftAvatar={<Avatar src={this.props.image} />}
          rightIconButton={rightIconMenu}
          primaryText={
            <span style={{ fontSize: '12px', color: 'grey' }}><b>{this.props.author}</b> posted {this.getTime()}</span>
          }
          secondaryText={
            <div style={styles.secondary}>
              <div>
                <div className={this.state.isEditing ? '' : 'hidden'}>
                  <TextField id={this.props.id.toString()} style={styles.text} underlineShow defaultValue={this.props.text} onChange={this.trackEdit} />
                  <FlatButton
                    label="Cancel"
                    primary
                    onTouchTap={this.toggleEditing}
                    className="pull-right"
                  />
                  <FlatButton
                    label="Submit"
                    primary
                    onTouchTap={this.handleEdit}
                    className="pull-right"
                  />
                </div>
                <div className={this.state.isEditing ? 'hidden' : ''}>
                  <p style={{ lineHeight: '20px', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '16px', fontSize: '17px', color: 'black' }} >{this.props.text}</p>
                </div>
              </div>
            </div>
          }
          onTouchTap={this.expandComment}
        />
      );
    }
  }
}

export default Comment;
