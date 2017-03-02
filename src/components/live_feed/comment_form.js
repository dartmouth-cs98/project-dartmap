import React from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

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
    const toSend = this.props.constructComment(text);
    this.props.onCommentSubmit(toSend);
    this.setState({
      text: '',
    });
  }

  render() {
    const styles = {
      avatar: {
        marginRight: 20,
      },
      button: {
        margin: 12,
      },
      text: {
        width: '80%',
      },
    };

    return (
      <div className="row">
        <Avatar
          src={(this.props.user && this.props.user.fbProfPicUrl) ? this.props.user.fbProfPicUrl : 'https://image.freepik.com/icones-gratis/macho-acima-silhueta-escura_318-39674.png'}
          style={styles.avatar}
        />
        <TextField style={styles.text}
          floatingLabelText="Add Comment"
          value={this.state.text} onChange={this.handleTextChange}
        />
        <div className="pull-right" style={styles.button}>
          <RaisedButton label="Post" primary={true} onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default CommentForm;
