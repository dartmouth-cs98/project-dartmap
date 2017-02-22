// reducers/index.js
// This file will bundle together all the possible reducers

import { combineReducers } from 'redux';

import UserReducer from './user-reducer';
import EventsReducer from './events-reducer';
import MapReducer from './map-reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  events: EventsReducer,
  map: MapReducer,
});

export default rootReducer;
