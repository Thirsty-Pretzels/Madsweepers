import { combineReducers } from 'redux';
import boardReducer from './reducer_board';
import playerLocationReducer from './reducer_player_location';

const rootReducer = combineReducers({
  board: boardReducer,
  playerLocation: playerLocationReducer
});

export default rootReducer;
