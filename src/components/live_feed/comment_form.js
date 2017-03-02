import React from 'react';

const NO_PROF_PIC = 'https://image.freepik.com/icones-gratis/macho-acima-silhueta-escura_318-39674.png';


class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const text = this.state.text.trim();
    if (!text) {
      return;
    }
    const toSend = this.props.constructComment(text);
    this.props.onCommentSubmit(toSend);
    this.setState({
      text: '',
    });
  }

  render() {
    let profPicUrl = this.props.user && this.props.user.fbProfPicUrl;
    profPicUrl = profPicUrl || NO_PROF_PIC;
    return (
      <li className="row collection-header">
        <div className="col m1">
          <img
            className="circle responsive-img"
            src={profPicUrl}
            alt="avatar"
          />
        </div>
        <div className="col m11">
          <input className="form-control" type="text"
            placeholder="Add a comment"
            value={this.state.text} onChange={this.handleTextChange}
          />
          <a className="waves-effect waves-teal btn-flat"
            onClick={this.handleSubmit}
          >
            Post
          </a>
        </div>
      </li>
    );
  }
}

export default CommentForm;
