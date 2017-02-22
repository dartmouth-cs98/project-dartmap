import React from 'react';
import CommentList from './comment_list';
import CommentForm from './comment_form';
import './comment.scss';
import { postComment, getComments, updateComment, deleteComment } from '../helpers/dartmap-api';

const API_URL = 'https://dartmapapi.herokuapp.com/api/';
const COMMENT_URL = 'comments/';

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.url = API_URL.concat(COMMENT_URL);
    this.key = 0;
    this.updateKey = this.updateKey.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentEdit = this.handleCommentEdit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.constructComment = this.constructComment.bind(this);
    this.deleteCommentFromArray = this.deleteCommentFromArray.bind(this);
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  updateKey() {
    this.key = this.key + 1;
    return this.key;
  }

  handleCommentSubmit(comment) {
    const comments = this.state.data;
    const newComments = comments.concat([comment]);
    postComment(this.url, comment).then((response) => {
      this.setState({ data: newComments });
    });
  }

  handleCommentEdit(id, comment) {
    const updateURL = this.url.concat(id);
    const newComment = this.constructComment(comment.content);
    const comments = this.deleteCommentFromArray(id);
    const newComments = comments.concat([newComment]);
    updateComment(updateURL, comment).then((response) => {
      console.log(response);
      this.setState({ data: newComments });
    });
  }

  handleCommentDelete(id) {
    const deleteURL = this.url.concat(id);
    const comments = this.deleteCommentFromArray(id);
    deleteComment(deleteURL).then((response) => {
      console.log(response);
      this.setState({ data: comments });
    });
  }

  loadCommentsFromServer() {
    getComments(this.url).then((response) => {
      this.setState({ data: response.comments });
    });
  }

  constructComment(text) {
    const toSend = {};
    toSend.user_id = '1';
    toSend.event_id = this.props.event_id;
    toSend.content = text;
    return toSend;
  }

  deleteCommentFromArray(id) {
    let i;
    for (i = 0; i < this.state.data.length; i += 1) {
      if (this.state.data[i].id === id) {
        break;
      }
    }
    const comments = this.state.data;
    comments.splice(i, 1);
    return comments;
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" />
        <div className="container">
          <div className="col-md-12 panel panel-white post panel-shadow">
            <h1> Live Feed </h1>
            <CommentForm constructComment={this.constructComment} onCommentSubmit={this.handleCommentSubmit} event_id={this.props.event_id} />
            <div className="post-footer">
              <CommentList data={this.state.data} onCommentEdit={this.handleCommentEdit} onCommentDelete={this.handleCommentDelete} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentBox;
