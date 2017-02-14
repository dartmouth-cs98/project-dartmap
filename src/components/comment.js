import React from 'react';
import './comment.scss';

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isEditing: false,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value,
    }, function () {
      this.props.onCommentEdit(this.props.key, this.state.text);
      this.setState({ isEditing: !this.state.isEditing });
    });
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.onCommentDelete(this.props.key);
  }

  toggleEditing(e) {
    e.preventDefault();
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1 comment-avatar rounded">
          <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" />
        </div>
        <div className="col-md-11 comment-box rounded">
          <div className="comment-head">
            <h6 className="comment-name by-author"><a href="http://creaticode.com/blog">{this.props.author}</a></h6>
            <span>posted 1 min ago</span>
            <i className="fa fa-heart" />
            <div className="commentActions">
              <div className={this.state.isEditing ? 'hidden' : ''}>
                <a href="#" className="pull-right" onClick={this.handleDelete} >Delete</a>
                <p className="pull-right">|</p>
                <a href="#" className="pull-right" onClick={this.toggleEditing}>Edit</a>
              </div>
              <div className={this.state.isEditing ? '' : 'hidden'}>
                <a href="#" onClick={this.toggleEditing}>Done editing </a>
              </div>
            </div>
          </div>
          <div className="comment-content">
            <div className={this.state.isEditing ? '' : 'hidden'}>
              <form className="" onSubmit={this.handleEdit}>
                <input type="text" defaultValue={this.props.text} />
                <input type="submit" value="Confirm changes" />
              </form>
            </div>
            <div className={this.state.isEditing ? 'hidden' : ''}>
              {this.props.text}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
