import React from 'react';

class Comment extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };

    this.markUp = this.markUp.bind(this);
  }

  markUp() {
    const md = new Remarkable();
    const rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div className="comment">
        <a className="pull-left" href="#">
          <img className="avatar" src="http://bootdey.com/img/Content/user_1.jpg" alt="avatar" />
        </a>
        <div className="comment-body">
          <div className="comment-heading">
            <h4 className="user">{this.props.author}</h4>
            <h5 className="time">5 minutes ago</h5>
          </div>
          <span inner={this.rawMarkup()} />
        </div>
      </div>
    );
  }
}

export default Comment;
