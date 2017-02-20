import React from 'react';
import moment from 'moment';
import './comment.scss';

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isEditing: false,
    };
    this.trackEdit = this.trackEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.getTime = this.getTime.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isEditing !== nextProps.isEditing) {
      return false;
    }
    return true;
  }

  getTime() {
    let time;
    time = moment.utc(this.props.time).toDate();
    time = moment(time).format('YYYY-MM-DD h:mm A');
    return time;
  }

  trackEdit(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleEdit(e) {
    e.preventDefault();
    const data = {};
    data.content = this.state.text;
    this.props.onCommentEdit(this.props.id, data);
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.onCommentDelete(this.props.id);
  }

  toggleEditing(e) {
    e.preventDefault();
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1 comment-avatar rounded">
          <img src="https://s28.postimg.org/cdfv0i8ot/party.png" alt="" />
        </div>
        <div className="col-md-11 comment-box rounded">
          <div className="comment-head">
            <h6 className="comment-name by-author">{this.props.author}</h6>
            <span>posted {this.getTime()}</span>
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
                <input type="text" defaultValue={this.props.text} onChange={this.trackEdit} />
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
