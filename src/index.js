// index.js

// import React onto the page
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// add the style sheets onto the page
import 'react-datetime/css/react-datetime.css';
import 'rc-slider/assets/index.css';
import 'react-select/dist/react-select.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import './style/style.scss';

// Helper function imports
import routes from './routes';
import reducers from './reducers';

// this creates the store with the reducers, and does some other stuff to initialize devtools
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

injectTapEventPlugin();

render((
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </MuiThemeProvider>
), document.getElementById('main'));
