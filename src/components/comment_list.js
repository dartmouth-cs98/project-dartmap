import React from 'react';
import Comment from './comment';
import './comment.scss';

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
    const commentNodes = this.props.data.map((comment) => {
      return (
        <li className="row list-group-item" key={comment.id}>
          <Comment author={comment.author} text={comment.content}
            id={comment.id} time={comment.timestamp}
            onCommentEdit={this.handleEdit} onCommentDelete={this.handleDelete}
          />
        </li>
      );
    });
    return (
      <div>
        <ul className="list-group">
          {commentNodes}
        </ul>
      </div>
    );
  }
}

export default CommentList;
