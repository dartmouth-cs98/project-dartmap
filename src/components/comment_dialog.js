import React from 'react';
import $ from 'jquery';
import CommentList from './comment_list';
import CommentForm from './comment_form';
import './comment.scss';

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    // this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
  }

  componentDidMount() {
    // this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
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
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        this.setState({ data: comments });
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      success: (data) => {
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" />
        <div className="container">
          <div className="col-md-12 panel panel-white post panel-shadow">
            <h1> Live Feed </h1>
            <CommentForm onCommentSubmit={this.handleCommentSubmit} event_id={this.props.event_id} />
            <div className="post-footer">
              <CommentList data={this.state.data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentBox;
