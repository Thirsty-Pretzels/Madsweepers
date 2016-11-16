import React from 'react';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import App from './app';
import LoginPage from './loginPage';
// import RoomListPage from './roomListPage'
import GamePlay from './gamePlay';

// basic setup of router.
const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LoginPage} />
      <Route path='roomList' component={RoomListPage} />
      <Route path='gamePlay' component={GamePlay} />
    </Route>
  </Router>
);

export default routes;
