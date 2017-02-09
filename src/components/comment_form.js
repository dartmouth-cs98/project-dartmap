import React from 'react';

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const author = React.findDOMNode(this.refs.author).value.trim();
    const text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: author, text: text });
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Your comment" ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

export default CommentForm;
