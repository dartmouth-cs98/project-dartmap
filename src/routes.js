// routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Component imports
import App from './components/app';
import Home from './components/home';
import UserPage from './components/user_page';
import EventPage from './components/event_page';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/user" component={UserPage} />
    <Route path="/events/:id" component={EventPage} />
  </Route>
);
