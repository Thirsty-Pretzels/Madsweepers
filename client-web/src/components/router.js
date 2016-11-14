import React from 'react';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import App from './app';
import LoginPage from './loginPage';
// import RoomListPage from './roomListPage'
import GamePlay from './gamePlay';


const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LoginPage} />
      <Route path='gamePlay' component={GamePlay} />
    </Route>
  </Router>
);

export default routes;

      // <Route path='roomList' component={RoomListPage} />
