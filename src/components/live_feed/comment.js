import React from 'react';
import moment from 'moment';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isEditing: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isEditing !== nextProps.isEditing) {
      return false;
    }
    return true;
  }

  getTime = () => {
    let time;
    time = moment.utc(this.props.time).toDate();
    time = moment(time).format('YYYY-MM-DD h:mm A');
    return time;
  }

  trackEdit = (e) => {
    this.setState({
      text: e.target.value,
    });
  }

  handleEdit = (e) => {
    e.preventDefault();
    const data = {};
    data.content = this.state.text;
    this.props.onCommentEdit(this.props.id, data);
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.onCommentDelete(this.props.id);
  }

  toggleEditing = (e) => {
    e.preventDefault();
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    const styles = {
      button: {
        margin: 12,
      },
      textField: {
        marginLeft: 10,
      },
    };

    return (
      <div>
        <div className="row">
          <span className="col-md-5"><b>{this.props.author}</b> posted {this.getTime()}</span>
          <div className={this.props.enable_edit ? '' : 'hidden'}>
            <div className="pull-right" style={styles.button}>
              <div className={this.state.isEditing ? 'hidden' : ''}>
                <RaisedButton label="Delete" primary={true} onClick={this.handleDelete} />
                <RaisedButton label="Edit" primary={true} onClick={this.toggleEditing} />
              </div>
            </div>
            <div className="row">
              <div className={this.state.isEditing ? '' : 'hidden'}>
                <div className="col-md-5">
                  <TextField style={styles.textField}
                    defaultValue={this.props.text}
                    onChange={this.trackEdit}
                  />
                </div>
                <div className="pull-right" style={styles.button}>
                  <RaisedButton label="Submit" primary={true} onClick={this.handleEdit} />
                </div>
              </div>
              <div className={this.state.isEditing ? 'hidden' : ''}>
                <TextField style={styles.textField}
                  defaultValue={this.props.text}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
