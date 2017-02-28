import React from 'react';
import { connect } from 'react-redux';
import CommentList from './comment_list';
import CommentForm from './comment_form';
import { fetchEvent, createComment, updateComment, deleteComment } from '../../actions';

const API_URL = 'https://dartmapapi.herokuapp.com/api/';
const COMMENT_URL = 'comments/';

class CommentBox extends React.Component {
  constructor() {
    super();
    this.url = API_URL.concat(COMMENT_URL);
    this.key = 0;
    this.updateKey = this.updateKey.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentEdit = this.handleCommentEdit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.constructComment = this.constructComment.bind(this);
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
    this.props.createComment(this.url, comment);
  }

  handleCommentEdit(id, comment) {
    const updateURL = this.url.concat(id);
    this.props.updateComment(updateURL, comment);
  }

  handleCommentDelete(id) {
    const deleteURL = this.url.concat(id);
    this.props.deleteComment(deleteURL);
  }

  loadCommentsFromServer() {
    this.props.fetchEvent(this.props.event_id);
  }

  constructComment(text) {
    const toSend = {};
    toSend.user_id = '1';
    toSend.event_id = this.props.event_id;
    toSend.content = text;
    return toSend;
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" />
        <div className="container">
          <div className="col-md-12 panel panel-white post panel-shadow">
            <h1> Live Feed </h1>
            <CommentForm constructComment={this.constructComment} onCommentSubmit={this.handleCommentSubmit} event_id={this.props.event_id} user={this.props.user} />
            <div className="post-footer">
              <CommentList data={ this.props.currentEvent ? this.props.currentEvent.comments : null } 
                          onCommentEdit={this.handleCommentEdit} onCommentDelete={this.handleCommentDelete} 
                          user_id={ this.props.user && this.props.user.userInfo && this.props.user.userInfo[0] && this.props.user.userInfo[0].id ? this.props.user.userInfo[0].id : null }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    currentEvent: state.events.currentEvent,
    user: state.user,
  }
);

const mapDispatchToProps = { fetchEvent, createComment, updateComment, deleteComment };

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
