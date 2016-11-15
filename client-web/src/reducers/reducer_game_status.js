var initialMines = 0

export default function(state=0, action) {
  if (action.type === 'COUNT-MINES') {
    var newState = action.minesLeft;
    return newState;
  } else {
    return state;
  }
}