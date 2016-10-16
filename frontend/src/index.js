// index.js

// import React onto the page
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// add the style sheet onto the page
import './style.scss';

// import the Components
import EventList from './components/event_list';
import NavBar from './components/nav_bar';
import MapContainer from './components/map_container';
import AddEventDialog from './components/add_event_dialog';
import FilterContainer from './components/filter_container';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      addEvent: false,
      eventList: [
        {
          id: 1,
          name: 'test event 1',
          location: 1,
        },
        {
          id: 2,
          name: 'test event 2',
          location: 2,
        },
        {
          id: 3,
          name: 'test event 3',
          location: 3,
        },
      ],  // the filtered list of events received from the back-end
      selectedLocation: null,
    };
  }
  render() {
    return (
      <div>
        <NavBar />
        <MapContainer />
        <EventList events={this.state.eventList} selectedLocation={this.state.selectedLocation} />
        <FilterContainer />
        <AddEventDialog addEvent={this.state.addEvent} />
      </div>
    );
  }
};

// const DynamicBounds = React.createClass({
//   getInitialState() {
//     return {
//       min: 0,
//       max: 100,
//     };
//   },
//   onSliderChange(value) {
//     log(value);
//   },
//   onMinChange(e) {
//     this.setState({
//       min: +e.target.value || 0,
//     });
//   },
//   onMaxChange(e) {
//     this.setState({
//       max: +e.target.value || 100,
//     });
//   },
//   render() {
//     return (
//       <div>
//         <label>Min: </label>
//         <input type="number" value={this.state.min} onChange={this.onMinChange} />
//         <br />
//         <label>Max: </label>
//         <input type="number" value={this.state.max} onChange={this.onMaxChange} />
//         <br /><br />
//         <Slider range defaultValue={[20, 50]} min={this.state.min} max={this.state.max}
//           onChange={this.onSliderChange} />
//       </div>
//     );
//   },
// });

// ReactDOM.render(
//   <div>
//     <div style={style}>
//       <p>Basic Range，`allowCross=false`</p>
//       <Slider range allowCross={false} defaultValue={[0, 20]} onChange={log} />
//     </div>
//     <div style={style}>
//       <p>Basic Range，`step=20` </p>
//       <Slider range step={20} defaultValue={[20, 20]} onBeforeChange={log} />
//     </div>
//     <div style={style}>
//       <p>Basic Range，`step=20, dots` </p>
//       <Slider range dots step={20} defaultValue={[20, 40]} onAfterChange={log} />
//     </div>
//     <div style={style}>
//       <p>Controlled Range</p>
//       <Slider range value={[20, 40]} />
//     </div>
//     <div style={style}>
//       <p>Multi Range</p>
//       <Slider range={3} value={[20, 40, 60, 80]} />
//     </div>
//     <div style={style}>
//       <p>Customized Range</p>
//       <CustomizedRange />
//     </div>
//     <div style={style}>
//       <p>Range with dynamic `max` `min`</p>
//       <DynamicBounds />
//     </div>
//   </div>
//   , document.getElementById('main'));




ReactDOM.render(<App />, document.getElementById('main'));
// React.render(<App defaultValue={[0, 100]} withBars />, document.body);
