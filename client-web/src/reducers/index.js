import { combineReducers } from 'redux';
import boardReducer from './reducer_board';
import playerLocationReducer from './reducer_player_location';
import updateScoresReducer from './reducer_score_update';
import usernameReducer from './reducer_username';

const rootReducer = combineReducers({
  username: usernameReducer,
  board: boardReducer,
  playerLocation: playerLocationReducer,
  scores: updateScoresReducer
});

export default rootReducer;
