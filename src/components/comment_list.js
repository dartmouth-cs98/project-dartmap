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
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit(id, editState) {
    this.props.toggleEdit(id, editState);
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
        <ul className="list-group">
          <Comment author={comment.author} text={comment.content}
            key={comment.id} id={comment.id}
            isEditing={this.props.isEditing[comment.id]} time={comment.timestamp}
            onCommentEdit={this.handleEdit} onCommentDelete={this.handleDelete}
          />
        </ul>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

export default CommentList;
