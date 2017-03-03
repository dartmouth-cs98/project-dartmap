import React from 'react';
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
        <li key={comment.id} className="collection-item">
          <Comment author={comment.author} text={comment.content} enable_edit={this.props.user_id===comment.user_id}
            id={comment.id} time={comment.timestamp} image={comment.user_image}
            onCommentEdit={this.handleEdit} onCommentDelete={this.handleDelete}
          />
        </li>
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
