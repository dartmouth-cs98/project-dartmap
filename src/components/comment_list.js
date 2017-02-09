import React from 'react';
import Comment from './comment';

class CommentList extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  render() {
    const commentNodes = this.props.data.map((comment) => {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
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
