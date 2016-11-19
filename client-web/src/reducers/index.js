import { combineReducers } from 'redux';
import newUserReducer from './reducer_new_user';
import updateRoomListReducer from './reducer_update_roomlist';
import updateRoomInfoReducer from './reducer_update_roominfo';
import readyStatusReducer from './reducer_ready_Status';
import boardReducer from './reducer_board';
import playerLocationReducer from './reducer_player_location';
import updateScoresReducer from './reducer_score_update';
import usernameReducer from './reducer_username';
// import roomNameReducer from './reducer_room_name';
import gameStatusReducer from './reducer_game_status';
import currentBoardViewReducer from './reducer_current_board_view';
import endificationReducer from './reducer_endification.js';
import highScoresReducer from './reducer_top_scores.js';

//combineReducers takes in an object
// the name of the key allows you to access the state in the redux state store
const rootReducer = combineReducers({
  userInfo: newUserReducer,
  roomList: updateRoomListReducer,
  roomInfo: updateRoomInfoReducer,
  allReady: readyStatusReducer,
  username: usernameReducer,
  highScores: highScoresReducer,
  // roomName: roomNameReducer,
  board: boardReducer,
  playerLocation: playerLocationReducer,
  scores: updateScoresReducer,
  gameStatus: gameStatusReducer,
  currentBoardView: currentBoardViewReducer,
  endification: endificationReducer
});

export default rootReducer;
