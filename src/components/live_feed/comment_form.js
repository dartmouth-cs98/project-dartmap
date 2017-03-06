import React from 'react';

import { ListItem, RaisedButton, Avatar, TextField } from 'material-ui';

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

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  render() {
    const profPicUrl = this.props.user && this.props.user.fbProfPicUrl ? this.props.user.fbProfPicUrl : NO_PROF_PIC;
    const styles = {
      avatar: {
        marginRight: 20,
      },
      button: {
        margin: 12,
      },
      text: {
        width: '85%',
      },
    };

    return (
      <ListItem
        leftAvatar={<Avatar src={profPicUrl} />}
        primaryText={
          <div>
            <TextField style={styles.text} floatingLabelText="Add Comment" onChange={this.handleTextChange} />
            <RaisedButton
              label="Post" primary
              onTouchTap={this.handleSubmit}
              className="pull-right"
            />
          </div>
        }
      />
    );
  }
}

export default CommentForm;
