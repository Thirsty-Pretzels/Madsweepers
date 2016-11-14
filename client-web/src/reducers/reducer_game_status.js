export default function(state, action) {
  if (action.type === 'COUNT-MINES') {
    // state is only readable. Thus, can't revise state directly. Must generate a new State and revise this state;
    var newState = state.slice();

    for (var i = 0; i < newState.length; i++) {
      if (newState[i].id === action.scoreChange.id) {
        newState[i].score += action.scoreChange.scoreChange;
        break;
      }
    }

    return newState;
  
  } else {
    return state;
  }
}