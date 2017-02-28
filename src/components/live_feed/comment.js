import React from 'react';
import moment from 'moment';

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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.3/css/materialize.min.css" />
        <div className="col m1">
          <img className="circle responsive-img" src={this.props.image} alt="" />
        </div>
        <div className="col m10">
          <div className="row">
            <span className="col m5"><b>{this.props.author}</b> posted {this.getTime()}</span>
            <div className="right-align">
              <div className={this.state.isEditing ? 'hidden' : ''}>
                <button onClick={this.handleDelete}>Delete</button>
                <button onClick={this.toggleEditing}>Edit</button>
              </div>
              <div className={this.state.isEditing ? '' : 'hidden'}>
                <a href="#" onClick={this.toggleEditing}>Done editing</a>
              </div>
            </div>
          </div>
          <div>
            <div className={this.state.isEditing ? '' : 'hidden'}>
              <form className="" onSubmit={this.handleEdit}>
                <input type="text" defaultValue={this.props.text} onChange={this.trackEdit} />
                <input type="submit" value="Confirm Changes" />
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
