import React from 'react';

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      author: '',
      text: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author, text });
    this.setState({
      author: '',
      text: '',
    });
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <div className="left">
          <img
            src="../../images/edrei.jpg"
            alt="You"
          />
          <p className="username">Edrei</p>
        </div>
        <div className="right">
          <textArea className="tb6" placeholder="Add a comment" value={this.state.text} onChange={this.handleTextChange} />
          <input type="submit" value="Post" />
        </div>
      </form>
    );
  }
}

export default CommentForm;
