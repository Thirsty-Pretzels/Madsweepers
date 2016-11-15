// the default board state is separated and put into another file 
var defaultState = require('./initialBoardState');

export default function(state = defaultState, action) {
  if (action.type === 'UPDATE-BOARD') {
      return action.payload;
  }
  return state;
}