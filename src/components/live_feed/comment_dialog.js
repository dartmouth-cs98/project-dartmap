import React from 'react';
import { connect } from 'react-redux';

import { Subheader, List } from 'material-ui';

import CommentList from './comment_list';
import CommentForm from './comment_form';

import { fetchEvent, createComment, updateComment, deleteComment } from '../../actions';

const API_URL = 'https://dartmapapi.herokuapp.com/api/';
const COMMENT_URL = 'comments/';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.url = API_URL.concat(COMMENT_URL);
    this.key = 0;
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  updateKey = () => {
    this.key = this.key + 1;
    return this.key;
  }

  handleCommentSubmit = (comment) => {
    this.props.createComment(this.url, comment);
  }

  handleCommentEdit = (id, comment) => {
    const updateURL = this.url.concat(id);
    this.props.updateComment(updateURL, comment);
  }

  handleCommentDelete = (id) => {
    const deleteURL = this.url.concat(id);
    this.props.deleteComment(deleteURL);
  }

  loadCommentsFromServer = () => {
    this.props.fetchEvent(this.props.event_id);
  }

  constructComment = (text) => {
    const toSend = {};
    toSend.user_id = '1';
    toSend.event_id = this.props.event_id;
    toSend.content = text;
    return toSend;
  }

  render() {
    return (
      <div>
        <List>
          <CommentForm constructComment={this.constructComment} onCommentSubmit={this.handleCommentSubmit} event_id={this.props.event_id} user={this.props.user} />
          <CommentList data={this.props.currentEvent ? this.props.currentEvent.comments : null}
            onCommentEdit={this.handleCommentEdit} onCommentDelete={this.handleCommentDelete}
            user_id={this.props.user && this.props.user.userInfo && this.props.user.userInfo[0] && this.props.user.userInfo[0].id ? this.props.user.userInfo[0].id : null}
          />
        </List>
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
