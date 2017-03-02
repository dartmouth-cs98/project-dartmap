import React from 'react';

import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

import Comment from './comment';

class CommentList extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: {},
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(id, data) {
    this.props.onCommentEdit(id, data);
  }

  handleDelete(id) {
    this.props.onCommentDelete(id);
  }

  render() {
    const commentNodes = this.props.data ? this.props.data.map((comment) => {
      return (
        <div key={comment.id}>
          <ListItem key={comment.id}
            leftAvatar={<Avatar src={comment.user_image} />}
          >
            <Comment author={comment.author} text={comment.content} enable_edit={this.props.user_id === comment.user_id}
              id={comment.id} time={comment.timestamp} image={comment.user_image}
              onCommentEdit={this.handleEdit} onCommentDelete={this.handleDelete}
            />
          </ListItem>
        </div>
      );
    }) : null;
    return (
      <div>
        {commentNodes}
      </div>
    );
  }
}

export default CommentList;
