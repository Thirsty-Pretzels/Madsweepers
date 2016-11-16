import { combineReducers } from 'redux';
import newUserReducer from './reducer_new_user';
import updateRoomListReducer from './reducer_update_roomlist';
import readyStatusReducer from './reducer_ready_Status';
import boardReducer from './reducer_board';
import playerLocationReducer from './reducer_player_location';
import updateScoresReducer from './reducer_score_update';
import usernameReducer from './reducer_username';
import roomNameReducer from './reducer_room_name';
import gameStatusReducer from './reducer_game_status';

//combineReducers takes in an object
// the name of the key allows you to access the state in the redux state store
const rootReducer = combineReducers({
  userInfo: newUserReducer,
  roomList: updateRoomListReducer,
  allReady: readyStatusReducer,
  username: usernameReducer,
  roomName: roomNameReducer,
  board: boardReducer,
  playerLocation: playerLocationReducer,
  scores: updateScoresReducer,
  gameStatus: gameStatusReducer
});

export default rootReducer;
