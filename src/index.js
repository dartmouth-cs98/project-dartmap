// index.js

// import React onto the page
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// add the style sheets onto the page
import 'react-datetime/css/react-datetime.css';
import 'rc-slider/assets/index.css';
import 'react-select/dist/react-select.css';
import './style/style.scss';

// Component imports
import NavBar from './components/nav_bar';
import Home from './components/home';
import UserPage from './components/user_page';

const App = (props) => {
  return (
    <div className="app-container">
      <NavBar />
      {props.children}
    </div>
  );
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/user" component={UserPage} />
    </Route>
  </Router>
), document.getElementById('main'));
