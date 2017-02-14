import React from 'react';
import Comment from './comment';
import './comment.scss';

class CommentList extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
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
        <ul className="list-group">
          <Comment author={comment.author} text={comment.content} key={comment.id} onCommentEdit={this.handleEdit} onCommentDelete={this.handleDelete} />
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
