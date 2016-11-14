import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';
import routes from './components/router';

// import the customized middleware
import startBoard, { boardMiddleware } from './middlewares/updateBoard';

// define store
const createStoreWithMiddleware = applyMiddleware(boardMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

// initialize store
startBoard(store);

// Render the router instead of any component.
ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>
  , document.querySelector('.container'));

