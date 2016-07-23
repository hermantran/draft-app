import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { App, Home, Draft, Deck } from './app';
import rootReducer from './rootReducer';
import { actionLogger, logPageView } from './middleware/analytics';

const router = routerMiddleware(browserHistory);
const store = createStore(rootReducer, applyMiddleware(actionLogger, thunk, router));
const history = syncHistoryWithStore(browserHistory, store);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} onUpdate={logPageView}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="draft" component={Draft} />
        <Route path="deck" component={Deck} />
        <Redirect path="*" to="/" />
      </Route>
    </Router>
  </Provider>,
  MOUNT_NODE
);