// fake_app_state_data.js

const FakeAppStateData = {
  filters: null,
  addEvent: false,
  eventList: [
    {
      id: '1',
      name: 'test event 1',
      location: 1,
      lat: 43.702732,
      lng: -72.290032,
      description: 'description1',
    },
    {
      id: '2',
      name: 'test event 2',
      location: 2,
      lat: 43.704252,
      lng: -72.294903,
      description: 'description2',
    },
    {
      id: '3',
      name: 'test event 3',
      location: 3,
      lat: 43.702141,
      lng: -72.282574,
      description: 'description3',
    },
  ],  // the filtered list of events received from the back-end
  selectedLocation: null,
  showBalloonEventId: null,
  showStickyBalloonEventId: null,
};

export default FakeAppStateData;
