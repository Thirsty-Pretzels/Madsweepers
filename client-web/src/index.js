import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from './components/app';
import reducers from './reducers';

import startBoard, { boardMiddleware } from './middlewares/updateBoard';

const createStoreWithMiddleware = applyMiddleware(boardMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
startBoard(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));