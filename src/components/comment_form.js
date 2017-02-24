import React from 'react';
import './comment.scss';

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
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
    const text = this.state.text.trim();
    if (!text) {
      return;
    }
    const toSend = this.props.constructComment(text);
    this.props.onCommentSubmit(toSend);
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <form className="post-heading row" onSubmit={this.handleSubmit}>
        <div className="col-md-1">
          <img className="avatar" src="https://s3.amazonaws.com/dartmap/edrei.jpg" alt="avatar" />
        </div>
        <div className="col-md-11 input-group">
          <input className="form-control" placeholder="Add a comment" type="text" value={this.state.text} onChange={this.handleTextChange} />
          <input className="input-group-addon" type="submit" value="Submit" onClick={this.handleSubmit} />
        </div>
      </form>
    );
  }
}

export default CommentForm;