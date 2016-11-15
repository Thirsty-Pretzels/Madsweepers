export default function(state = '', action) {
  if (action.type === 'COUNT-MINES') {
    var newState = action.minesLeft;
    return newState;
  } else {
    return state;
  }
}