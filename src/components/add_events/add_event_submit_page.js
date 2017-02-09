// add_event_submit_page.js
import React, { Component } from 'react';

class AddEventSubmitPage extends Component {
  constructor(props) {
    super(props);
    const hiddenErrorMessage = <div className="hidden" />;
    const dateString = (this.props.data.date) ? this.props.data.date.format('YYYY-MM-DD') : null;
    const startTimeString = (this.props.data.start_time) ? this.props.data.start_time.format('HH:mm') : null;
    const endTimeString = (this.props.data.end_time) ? this.props.data.end_time.format('HH:mm') : null;
    this.allFields = [
      { text: 'Name', id: 'name', value: this.props.data.name, required: true, errorMsg: hiddenErrorMessage },
      { text: 'Description', id: 'description', value: this.props.data.description, required: false, errorMsg: hiddenErrorMessage },
      { text: 'Organizer', id: 'organizer', value: this.props.data.organizer, required: true, errorMsg: hiddenErrorMessage },
      { text: 'Date', id: 'date', value: dateString, required: true, errorMsg: hiddenErrorMessage },
      { text: 'Start Time', id: 'start_time', value: startTimeString, required: true, errorMsg: hiddenErrorMessage },
      { text: 'End Time', id: 'end_time', value: endTimeString, required: true, errorMsg: hiddenErrorMessage },
      { text: 'Location', id: 'location_string', value: this.props.data.location_string, required: true, errorMsg: hiddenErrorMessage },
      { text: 'Icon URL', id: 'icon_url', value: this.props.data.icon.url, required: true, errorMsg: hiddenErrorMessage },
      { text: 'Image URL', id: 'image_url', value: this.props.data.image_url, required: true, errorMsg: hiddenErrorMessage },
      { text: 'Categories', id: 'categories', value: this.props.data.categories.map(category => category.label).toString(), required: true, errorMsg: hiddenErrorMessage },
    ];
    for (let i = 0; i < this.allFields.length; i += 1) {
      if (this.allFields[i].required) {
        const data = this.allFields[i];
        if (!data.value) {
          this.allFields[i].errorMsg = <div key={data.id} className="error-msg"> {data.text} is required. </div>;
        }
      }
    }
  }
  render() {
    // const nameErrorMessage = (this.state.name === '') ? this.visibleErrorMessages[0] : this.hiddenErrorMessage;
    // const organizerErrorMessage = (this.state.organizer === '') ? this.visibleErrorMessages[1] : this.hiddenErrorMessage;
    // const desciptionErrorMessage = (this.state.description === '') ? this.visibleErrorMessages[2] : this.hiddenErrorMessage;
    // {JSON.stringify(this.props.data)}
    return (
      <div>
        <h1>Submit event</h1>
        {this.allFields.map((data) => {
          return (
            <div className={data.id.concat(' submit-event-category')} key={data.id}>
              <div className="submit-cat-title">{data.text}</div>
              <div className="submit-cat-data">{data.value}</div>
              {data.errorMsg}
            </div>
          );
        })}
        <button type="button" onClick={this.props.submitEventData}>Submit</button>
      </div>
    );
  }
}

export default AddEventSubmitPage;
