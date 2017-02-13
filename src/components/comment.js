import React from 'react';
import Showdown from 'showdown';

const converter = new Showdown.converter();

class Comment extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };

    this.rawMarkup = this.rawMarkup.bind(this);
  }

  rawMarkup() {
    const rawMarkup = converter.makeHtml(this.props.children.toString());
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
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      </div>
    );
  }
}

export default Comment;
