import React from 'react';

import { Divider } from 'material-ui';

import Comment from './comment';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: {},
    };
  }

  handleEdit = (id, data) => {
    this.props.onCommentEdit(id, data);
  }

  handleDelete = (id) => {
    this.props.onCommentDelete(id);
  }

  render() {
    const commentNodes = this.props.data ? this.props.data.map((comment) => {
      return (
        <div key={comment.id}>
          <Comment author={comment.author} text={comment.content} enable_edit={this.props.user_id === comment.user_id}
            id={comment.id} time={comment.timestamp} image={comment.user_image}
            onCommentEdit={this.handleEdit} onCommentDelete={this.handleDelete}
          />
          <Divider inset />
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
