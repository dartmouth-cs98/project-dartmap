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
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span inner={this.rawMarkup()} />
      </div>
    );
  }
}

export default Comment;
