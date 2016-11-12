import { combineReducers } from 'redux';
import boardReducer from './reducer_board';

const rootReducer = combineReducers({
  board: boardReducer
});

export default rootReducer;
