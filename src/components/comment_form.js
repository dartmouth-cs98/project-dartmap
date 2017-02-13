import React from 'react';

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = this.state.text.trim();
    if (!text) {
      return;
    }
    const toSend = {
      user_id: 1,
      event_id: this.props.event_id,
      content: text,
    };
    this.props.onCommentSubmit(toSend);
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <form className="post-heading row" onSubmit={this.handleSubmit}>
        <a className="col-md-1" href="#">
          <img className="avatar" src="http://bootdey.com/img/Content/user_1.jpg" alt="avatar" />
        </a>
        <div className="col-md-11 input-group">
          <input className="form-control" placeholder="Add a comment" type="text" value={this.state.text} onChange={this.handleTextChange} />
          <span className="input-group-addon">
            <a href="#"><i className="fa fa-edit"></i></a>
          </span>
        </div>
      </form>
    );
  }
}

export default CommentForm;
