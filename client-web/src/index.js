import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

// import the customized middleware
import startBoard, { boardMiddleware } from './middlewares/updateBoard';

// define store
const createStoreWithMiddleware = applyMiddleware(boardMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

// initialize store
startBoard(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));