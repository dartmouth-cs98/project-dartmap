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

  // loadCommentsFromServer() {
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     type: 'GET',
  //     success: (data) => {
  //       this.setState({ data });
  //     },
  //     error: (xhr, status, err) => {
  //       console.error(this.props.url, status, err.toString());
  //     },
  //   });
  // }

  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" />
        <div className="container">
          <div className="col-md-8">
            <div className="panel panel-white post panel-shadow">
              <div className="post-heading">
                <div className="pull-left image">
                  <img src="http://bootdey.com/img/Content/user_1.jpg" className="img-circle avatar" alt="user profile image" />
                </div>
                <div className="pull-left meta">
                  <div className="title h5">
                    <a href="#"><b>Ryan Haywood </b></a>
                    made a post.
                  </div>
                  <h6 className="text-muted time">1 minute ago</h6>
                </div>
              </div>
              <div className="post-description">
                <p>Bootdey is a gallery of free snippets resources templates and utilities for bootstrap css hmtl js framework. Codes for developers and web designers</p>
                <div className="stats">
                  <a href="#" className="btn btn-default stat-item">
                    <div className="fa fa-thumbs-up icon" />2
                  </a>
                  <a href="#" className="btn btn-default stat-item">
                    <i className="fa fa-share icon" />12
                  </a>
                </div>
              </div>
              <div className="post-footer">
                <div className="input-group">
                  <input className="form-control" placeholder="Add a comment" type="text" />
                  <span className="input-group-addon">
                    <a href="#"><i className="fa fa-edit"></i></a>
                  </span>
                </div>
                <ul className="comments-list">
                  <li className="comment">
                    <a className="pull-left" href="#">
                      <img className="avatar" src="http://bootdey.com/img/Content/user_1.jpg" alt="avatar" />
                    </a>
                    <div className="comment-body">
                      <div className="comment-heading">
                        <h4 className="user">Gavino Free</h4>
                        <h5 className="time">5 minutes ago</h5>
                      </div>
                      <p>Sure, oooooooooooooooohhhhhhhhhhhhhhhh</p>
                    </div>
                    <ul className="comments-list">
                      <li className="comment">
                        <a className="pull-left" href="#">
                          <img className="avatar" src="http://bootdey.com/img/Content/user_3.jpg" alt="avatar" />
                        </a>
                        <div className="comment-body">
                          <div className="comment-heading">
                            <h4 className="user">Ryan Haywood</h4>
                            <h5 className="time">3 minutes ago</h5>
                          </div>
                          <p>Relax my friend</p>
                        </div>
                      </li>
                      <li className="comment">
                        <a className="pull-left" href="#">
                          <img className="avatar" src="http://bootdey.com/img/Content/user_2.jpg" alt="avatar" />
                        </a>
                        <div className="comment-body">
                          <div className="comment-heading">
                            <h4 className="user">Gavino Free</h4>
                            <h5 className="time">3 minutes ago</h5>
                          </div>
                          <p>Ok, cool.</p>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentBox;
