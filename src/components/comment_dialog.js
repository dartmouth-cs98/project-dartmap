import React from 'react';
import $ from 'jquery';
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
      isEditing: {},
    };
    this.url = API_URL.concat(COMMENT_URL);
    this.key = 0;
    this.updateKey = this.updateKey.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentEdit = this.handleCommentEdit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.initializeEditState = this.initializeEditState.bind(this);
  }

  componentDidMount() {
    $.ajax(this.loadCommentsFromServer()).then(this.initializeEditState());
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  initializeEditState() {
    const clone = {};
    let i;
    for (i = 0; i < this.state.data.length; i += 1) {
      clone[this.state.data[i].id] = false;
    }
    this.setState({
      isEditing: clone,
    });
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

  toggleEdit(id, editState) {
    const clone = $.extend({}, this.state.isEditing);
    clone[id] = editState;
    this.setState({
      isEditing: clone,
    });
  }

  handleCommentEdit(id, comment) {
    const updateURL = this.url.concat(id);
    updateComment(updateURL, comment).then((response) => {
      console.log(response);
    });
  }

  handleCommentDelete(id) {
    const deleteURL = this.url.concat(id);
    deleteComment(deleteURL).then((response) => {
      console.log(response);
    });
  }

  loadCommentsFromServer() {
    const resp = $.Callbacks()getComments(this.url).then((response) => {
      this.setState({ data: response.comments });
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
              <CommentList data={this.state.data} isEditing={this.state.isEditing} key={this.updateKey()} toggleEdit={this.toggleEdit} onCommentEdit={this.handleCommentEdit} onCommentDelete={this.handleCommentDelete} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentBox;
