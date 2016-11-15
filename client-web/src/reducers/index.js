import { combineReducers } from 'redux';
import boardReducer from './reducer_board';
import playerLocationReducer from './reducer_player_location';
import updateScoresReducer from './reducer_score_update';
import usernameReducer from './reducer_username';
import gameStatusReducer from './reducer_game_status';

//combineReducers takes in an object
// the name of the key allows you to access the state in the redux state store
const rootReducer = combineReducers({
  username: usernameReducer,
  board: boardReducer,
  playerLocation: playerLocationReducer,
  scores: updateScoresReducer,
  gameStatus: gameStatusReducer

});

export default rootReducer;
