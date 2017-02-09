// reducers/user-reducer.js
// This file contains the reducers for the user state

import { ActionTypes } from '../actions';

const UserReducer = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { name: 'test', id: 1 };
    case ActionTypes.LOGOUT:
      return null;
    default:
      return state;
  }
};

export default UserReducer;
