// the default board state is separated and put into another file
var defaultState = require('./initialBoardState');

export default function(state = defaultState, action) {
  if (action.type === 'UPDATE-BOARD') {
    if (action.payload.type === 0) {
      // if payload.type is 0, we are receiving the whole board
      return action.payload.board;
    } else if (action.payload.type === 1) {
      // we are receiving the changes of the board, do some local calculation
      // step 1: deep copy state, which is two dimensional array
      var newState = [];
      for (var i = 0; i < state.length; i++) {
        newState[i] = state[i].slice();
      }

      // update newState
      newState[action.payload.locationY][action.payload.locationX].status = action.payload.status;

      return newState;
    }
  }
  return state;
}