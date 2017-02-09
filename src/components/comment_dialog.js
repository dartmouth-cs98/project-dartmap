import React from 'react';
import $ from 'jquery';
import CommentList from './comment_list';
import CommentForm from './comment_form';

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
  }

  handleCommentSubmit(comment) {
    const comments = this.state.data;
    const newComments = comments.concat([comment]);
    this.setState({ data: newComments });
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => {
        this.setState({ data: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (data) => {
        this.setState({ data: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments </h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

export default CommentBox;
