import React from 'react';

class Comment extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author} </h2>
        {this.props.children}
      </div>
    );
  }
}

export default Comment;
