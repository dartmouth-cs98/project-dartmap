import React from 'react';
import moment from 'moment';

import { Dialog, FlatButton, RaisedButton, ListItem, Avatar, IconButton, IconMenu, MenuItem } from 'material-ui';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isEditing: false,
      isEditDialogOpen: false,
      isDeleteDialogOpen: false,
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

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleOpenDelete}
      />,
      <FlatButton
        label="Discard"
        primary
        onTouchTap={this.handleDelete}
      />,
    ];

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
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          onTouchTap={this.handleOpenEdit}
        >
          Edit
        </MenuItem>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.isEditDialogOpen}
          onRequestClose={this.handleOpenEdit}
        >
          Discard draft?
        </Dialog>
        <MenuItem
          onTouchTap={this.handleOpenDelete}
        >
          Delete
        </MenuItem>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.isDeleteDialogOpen}
          onRequestClose={this.handleOpenDelete}
        />
      </IconMenu>
    );

    return (
      <ListItem
        leftAvatar={<Avatar src={this.props.image} />}
        rightIconButton={rightIconMenu}
        primaryText={
          <span className="col m5"><b>{this.props.author}</b> posted {this.getTime()}</span>
        }
        secondaryText={
          <div>
            <div className={this.props.enable_edit ? '' : 'hidden'}>
              <div className="right-align">
                <div className={this.state.isEditing ? 'hidden' : ''}>
                  <button onClick={this.handleDelete}>Delete</button>
                  <button onClick={this.toggleEditing}>Edit</button>
                </div>
              </div>
              <div className="comment-content">
                <div className={this.state.isEditing ? '' : 'hidden'}>
                  <form className="" onSubmit={this.handleEdit}>
                    <input type="text" defaultValue={this.props.text} onChange={this.trackEdit} />
                    <input type="submit" value="Confirm Changes" />
                  </form>
                </div>
                <div className={this.state.isEditing ? 'hidden' : ''}>
                  {this.props.text}
                </div>
              </div>
            </div>
            <div className={this.state.isEditing ? '' : 'hidden'}>
              <form className="" onSubmit={this.handleEdit}>
                <input type="text" defaultValue={this.props.text} onChange={this.trackEdit} />
                <input type="submit" value="Confirm Changes" />
              </form>
            </div>
            <div className={this.state.isEditing ? 'hidden' : ''}>
              {this.props.text}
            </div>
          </div>
        }
        secondaryTextLines={2}
      />
    );
  }
}

export default Comment;
